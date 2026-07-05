
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SendHorizontal } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

const API_KEY = "AQ.Ab8RN6LyyqhSA4tokwi2RL1alT6oW7JfmJUlRaOwX_5I_kwx3A";
 
function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      sender: "ai",
      text: "👋 Hello! How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      toast.error("Please enter a message");
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: trimmedMessage,
    };

    // Store current chat history before state updates
    const chatHistory = [
      ...messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [{ text: trimmedMessage }],
      },
    ];

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const payload = {
        contents: chatHistory,
      };

      const { data } = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
          },
        }
      );

      const aiResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";

      const aiMessage = {
        id: crypto.randomUUID(),
        sender: "ai",
        text: aiResponse,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.error?.message ||
          "Failed to generate response"
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl h-[92vh] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)] flex flex-col">

          {/* Header */}
          <header className="border-b border-white/10 p-5 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              <span className="text-blue-400">C</span>
              <span className="text-white">hater</span>
            </h1>
          </header>

          {/* Messages */}
          <main className="flex-1 overflow-y-auto p-5 space-y-5">
            {messages.length === 1 && (
              <div className="h-full flex items-center justify-center text-white/50 text-lg">
                Start a conversation...
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex animate__animated animate__fadeIn ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[70%] px-5 py-3 rounded-2xl shadow-lg whitespace-pre-wrap break-words ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start animate__animated animate__fadeIn">
                <div className="bg-slate-800 text-white px-5 py-3 rounded-2xl shadow-lg">
                  <div className="flex gap-1 text-lg">
                    <span className="animate-bounce">•</span>
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    >
                      •
                    </span>
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    >
                      •
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </main>

          {/* Footer */}
          <footer className="border-t border-white/10 p-4">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3 bg-white rounded-2xl p-2 shadow-xl"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-transparent outline-none px-4 py-3 text-black placeholder:text-gray-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="p-3 rounded-xl bg-blue-600 text-white transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                <SendHorizontal size={20} />
              </button>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
