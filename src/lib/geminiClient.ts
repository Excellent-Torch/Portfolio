/**
 * Thin client for the portfolio chatbot.
 *
 * Talks to a Cloudflare Worker proxy (see /worker in this repo) that holds the
 * Gemini API key as a secret and forwards requests to the Gemini REST API. The
 * frontend never sees or sends the API key — only the Worker URL, which is not
 * a secret.
 *
 * Model used (free tier, smallest Flash): gemini-2.5-flash-lite
 */

import { SYSTEM_PROMPT } from "./profileContext";

/**
 * Default production Worker URL. Override for local dev with
 * VITE_CHAT_WORKER_URL (e.g. point it at `wrangler dev`'s http://localhost:8787).
 * Worker URLs are not secrets, so hardcoding the prod value here is fine.
 */
const DEFAULT_WORKER_URL = "https://portfolio-chat.ishanmaduranga42.workers.dev/chat";

const WORKER_URL: string =
  (import.meta.env.VITE_CHAT_WORKER_URL as string | undefined) ??
  DEFAULT_WORKER_URL;

/** True until you replace DEFAULT_WORKER_URL with your deployed Worker URL. */
const WORKER_NOT_CONFIGURED = WORKER_URL.includes("EXAMPLE.workers.dev");

/** A single chat turn in the UI's history. */
export interface ChatTurn {
  sender: "user" | "bot";
  text: string;
}

/** Gemini REST API "contents" entry. */
interface GeminiContent {
  role: "user" | "model";
  parts: { text: string }[];
}

/** Maps UI history into Gemini's `contents` array (user/model roles). */
function toGeminiContents(history: ChatTurn[]): GeminiContent[] {
  return history.map((turn) => ({
    role: turn.sender === "user" ? "user" : "model",
    parts: [{ text: turn.text }],
  }));
}

export class ChatError extends Error {
  readonly status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ChatError";
    this.status = status;
  }
}

/**
 * Ask the Gemini-backed assistant.
 *
 * @param history  prior turns (user + bot), oldest first
 * @param signal   AbortSignal to cancel an in-flight request
 * @returns        the assistant's reply text
 * @throws         ChatError on network failure, non-2xx, or empty response
 */
export async function askGemini(
  history: ChatTurn[],
  signal?: AbortSignal
): Promise<string> {
  if (WORKER_NOT_CONFIGURED) {
    throw new ChatError(
      "Chat backend isn't configured yet. Set the Worker URL in src/lib/geminiClient.ts (or VITE_CHAT_WORKER_URL)."
    );
  }

  const body = {
    contents: toGeminiContents(history),
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    generationConfig: {
      temperature: 0.4,
      topP: 0.9,
      maxOutputTokens: 512,
    },
  };

  let res: Response;
  try {
    res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
    throw new ChatError("Network error reaching the assistant.");
  }

  if (!res.ok) {
    let detail = "";
    try {
      detail = (await res.text()).slice(0, 300);
    } catch {
      /* ignore */
    }
    throw new ChatError(
      `Assistant request failed (${res.status}). ${detail}`.trim(),
      res.status
    );
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new ChatError("Malformed response from the assistant.");
  }

  const text = extractText(data);
  if (!text) {
    throw new ChatError("The assistant returned an empty response.");
  }
  return text;
}

/** Safely pulls `candidates[0].content.parts[*].text` out of a Gemini response. */
function extractText(data: unknown): string {
  if (typeof data !== "object" || data === null) return "";
  const candidates = (data as { candidates?: unknown }).candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return "";
  const first = candidates[0] as { content?: { parts?: unknown[] } };
  const parts = first?.content?.parts;
  if (!Array.isArray(parts)) return "";
  return parts
    .map((p) => (p && typeof p === "object" && "text" in p ? String((p as { text: unknown }).text) : ""))
    .filter(Boolean)
    .join("\n")
    .trim();
}
