import React, { useState , useRef, useEffect} from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [inputRows, setInputRows] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setInputRows(1);

    // temporary fake bot reply
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: "Thanks for your message! (Backend WIP)" }]);
    }, 500);
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
          {/* Header */}
          <button onClick={toggleChat} className="close">✕</button>
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center margin-top-25">            
            <h3 className="font-semibold margin-top-25">Howdy!, Ask me anything 👋 (Under Development)</h3>
          </div>

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
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  width: '100%',
                }}
              >
                <div
                  style={{
                    background: msg.sender === "user" ? "#3b82f6" : "#f3f4f6",
                    color: msg.sender === "user" ? "#fff" : "#222",
                    borderRadius: "18px",
                    padding: "8px 14px",
                    margin: "2px 0",
                    maxWidth: "70%",
                    boxShadow: msg.sender === "user"
                      ? "0 2px 8px rgba(59,130,246,0.08)"
                      : "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="input-box">
            

            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSend();
                  setInputRows(1); // Reset textarea rows to default after send
                }
              }}
              className="msg-input"
              placeholder="Type a message..."
              rows={inputRows}
            />

            <button onClick={handleSend} className="send-button">
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
