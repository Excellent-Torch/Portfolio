import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { askGemini, ChatError, type ChatTurn } from "../lib/geminiClient";

const GREETING =
  "Howdy! Ask me anything :) -- My skills, experience, projects, or how to get in touch. 👋";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [inputRows, setInputRows] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const greetedRef = useRef(false);

  const toggleChat = () => setIsOpen((prev) => !prev);

  // Show a one-time greeting when the chat is first opened.
  useEffect(() => {
    if (isOpen && !greetedRef.current) {
      greetedRef.current = true;
      setMessages([{ sender: "bot", text: GREETING }]);
    }
  }, [isOpen]);

  // Cancel any in-flight request when the widget unmounts/closes.
  useEffect(() => {
    if (!isOpen && abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userTurn: ChatTurn = { sender: "user", text };
    const nextHistory = [...messages, userTurn];
    setMessages(nextHistory);
    setInput("");
    setInputRows(1);
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const reply = await askGemini(nextHistory, controller.signal);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      const msg =
        err instanceof ChatError
          ? `Sorry, I couldn't reach the assistant right now. ${err.message}`
          : "Sorry, something went wrong. Please try again.";
      setMessages((prev) => [...prev, { sender: "bot", text: msg }]);
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Dynamically resize input box based on content
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    // Calculate rows for textarea (limit to 5 rows)
    const lines = value.split('\n').length + Math.floor(value.length / 40);
    setInputRows(Math.min(5, Math.max(1, lines)));
  };

    // Resizing logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const rect = resizeRef.current?.getBoundingClientRect();
      if (rect) {
        // Calculate new width and height based on mouse position relative to top left
        const newWidth = Math.max(260, Math.min(600, rect.right - e.clientX));
        const newHeight = Math.max(260, Math.min(700, rect.bottom - e.clientY));
        setDimensions({ width: newWidth, height: newHeight });
      }
    };
    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
         
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="chat-box"
          ref={resizeRef}
          style={{
            
            width: dimensions.width,
            height: dimensions.height,
            
            
            userSelect: isResizing ? 'none' : 'auto',
          }}
        >
          {/* Close button (header text removed — the greeting dialog pops in instead) */}
          <button onClick={toggleChat} className="close">✕</button>

          {/* Messages */}
          <div
            className="flex-1 p-3 space-y-2 text-sm"
            style={{
              overflowY: 'auto',
              flex: 1,
              minHeight: 0,
              maxHeight: 450
             
            }}
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  width: '100%',
                }}
              >
                <div
                  style={{
                    background: msg.sender === "user" ? "#4a4a4a" : "#1f1f1f",
                    color: msg.sender === "user" ? "#f5f5f5" : "#d4d4d4",
                    borderRadius: "18px",
                    padding: "8px 14px",
                    margin: "2px 0",
                    maxWidth: "70%",
                    boxShadow: msg.sender === "user"
                      ? "0 2px 8px rgba(0,0,0,0.45)"
                      : "0 2px 8px rgba(0,0,0,0.55)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
              >
                <div
                  style={{
                    background: "#1f1f1f",
                    color: "#d4d4d4",
                    borderRadius: "18px",
                    padding: "8px 14px",
                    margin: "2px 0",
                    maxWidth: "70%",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.55)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontStyle: "italic",
                  }}
                >
                  Ishan's assistant is typing…
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="input-box">
            

            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                  setInputRows(1); // Reset textarea rows to default after send
                }
              }}
              className="msg-input"
              placeholder={isLoading ? "Wait for the reply…" : "Type a message..."}
              rows={inputRows}
              disabled={isLoading}
            />

            <button
              onClick={handleSend}
              className="send-button"
              disabled={isLoading || !input.trim()}
              style={{ opacity: isLoading || !input.trim() ? 0.5 : 1, cursor: isLoading ? "wait" : "pointer" }}
            >
              <Send size={18} />
            </button>
          </div>
           {/* Resize handle */}
          <div
            className="resize-handle"
            onMouseDown={() => setIsResizing(true)}
            title="Resize"
          >
            <svg width="12" height="12" viewBox="0 0 18 18">
              <polyline points="4,18 18,4" stroke="#888" strokeWidth="2" fill="none" />
              <polyline points="10,18 18,10" stroke="#888" strokeWidth="2" fill="none" />
              <polyline points="16,18 18,16" stroke="#888" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatWidget;
