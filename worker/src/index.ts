/**
 * Cloudflare Worker proxy for the portfolio chatbot.
 *
 * Why this exists: the portfolio is a static GitHub Pages site with no backend,
 * so the Gemini API key cannot safely live in the frontend bundle. This Worker
 * holds the key as a wrangler SECRET (set via `wrangler secret put GEMINI_API_KEY`)
 * and forwards chat requests to the Gemini REST API. The browser only ever
 * knows this Worker's URL (not a secret).
 *
 * Model (free tier, smallest Flash): gemini-2.5-flash-lite
 *
 * Security:
 *  - CORS: only allows origins listed in ALLOWED_ORIGINS (a non-secret var in wrangler.toml).
 *  - Rate limiting: ~10 requests/min per IP using the Workers Cache API as a token bucket.
 *  - The API key is read from env (never logged, never returned to the client).
 */

interface Env {
  GEMINI_API_KEY: string;
  ALLOWED_ORIGINS: string; // comma-separated, set in wrangler.toml [vars]
}

const GEMINI_MODEL = "gemini-2.5-flash-lite";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const RATE_LIMIT_PER_MIN = 10;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    const allowed = env.ALLOWED_ORIGINS
      ? env.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const isAllowed = allowed.length === 0 || allowed.includes(origin);

    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(isAllowed ? origin : ""),
      });
    }

    if (!isAllowed) {
      return json({ error: "Origin not allowed" }, 403);
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed. Use POST." }, 405, origin);
    }

    // ---- Rate limit (per-IP token bucket via Cache API) ----
    const ip =
      request.headers.get("CF-Connecting-IP") ??
      request.headers.get("X-Real-IP") ??
      "unknown";
    const cacheKey = new Request(
      new URL(`https://rl.local/ip=${encodeURIComponent(ip)}`),
      { method: "GET" }
    );
    const cache = caches.default;
    const now = Date.now();
    let bucket: { count: number; windowStart: number } = { count: 0, windowStart: now };
    try {
      const cached = await cache.match(cacheKey);
      if (cached) {
        const parsed = (await cached.json()) as typeof bucket;
        if (parsed && typeof parsed.count === "number") bucket = parsed;
      }
    } catch {
      /* ignore cache read errors */
    }

    // Reset window if a minute has passed.
    if (now - bucket.windowStart > 60_000) {
      bucket = { count: 0, windowStart: now };
    }
    bucket.count += 1;

    // Persist (don't await — fire and forget via ctx.waitUntil)
    ctx.waitUntil(
      cache.put(
        cacheKey,
        new Response(JSON.stringify(bucket), {
          headers: { "Cache-Control": "max-age=60" },
        })
      )
    );

    if (bucket.count > RATE_LIMIT_PER_MIN) {
      return json(
        { error: "Rate limit exceeded. Please slow down." },
        429,
        origin
      );
    }

    // ---- Forward to Gemini ----
    if (!env.GEMINI_API_KEY) {
      return json({ error: "Server missing API key." }, 500, origin);
    }

    let clientBody: unknown;
    try {
      clientBody = await request.json();
    } catch {
      return json({ error: "Invalid JSON body." }, 400, origin);
    }

    let geminiRes: Response;
    try {
      geminiRes = await fetch(GEMINI_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": env.GEMINI_API_KEY,
        },
        body: JSON.stringify(clientBody),
      });
    } catch {
      return json({ error: "Failed to reach Gemini." }, 502, origin);
    }

    // Pass through Gemini's JSON (success or error) to the client, minus the key.
    const text = await geminiRes.text();
    return new Response(text, {
      status: geminiRes.status,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(origin),
      },
    });
  },
};

function corsHeaders(origin: string): Record<string, string> {
  const h: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (origin) h["Access-Control-Allow-Origin"] = origin;
  return h;
}

function json(body: unknown, status: number, origin?: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin ?? ""),
    },
  });
}
