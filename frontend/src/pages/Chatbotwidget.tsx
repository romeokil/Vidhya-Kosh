import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  role: "user" | "bot" | "system";
  text: string;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", text: "Hi 👋 I am Ziva, Ask for course recommendation?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const formatReply = (reply: any) => {
    if (Array.isArray(reply)) {
      return `📚 Recommended Courses:\n\n${reply
        .map((course: string, index: number) => `${index + 1}. ${course}`)
        .join("\n")}`;
    }

    if (typeof reply === "string" && reply.includes(",")) {
      const items = reply.split(",").map((item) => item.trim());
      return `📚 Recommended Courses:\n\n${items
        .map((course, index) => `${index + 1}. ${course}`)
        .join("\n")}`;
    }

    return reply;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("Backend unavailable");

      const data = await res.json();
      const formattedReply = formatReply(data.reply);

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: formattedReply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Chat backend is not available at the moment. It will be available soon.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([{ role: "system", text: "New chat started 👋" }]);
  };

  return (
    <>
      {/* Floating Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg
          bg-primary text-white
          dark:bg-white dark:text-black
          hover:scale-105 transition
        "
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="
            fixed bottom-20 right-6 z-50 w-[90vw] max-w-sm h-[70vh]
            bg-background dark:bg-zinc-900
            border border-border dark:border-zinc-700
            rounded-2xl shadow-xl flex flex-col overflow-hidden
          "
        >
          {/* Header */}
          <div
            className="
              flex items-center justify-between px-4 py-3 border-b
              bg-muted dark:bg-zinc-800
              border-border dark:border-zinc-700
            "
          >
            <h2 className="font-semibold text-foreground dark:text-white">
              AI Assistant
            </h2>
            <button
              onClick={startNewChat}
              title="New Chat"
              className="text-foreground dark:text-white"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 whitespace-pre-line"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`
                    px-3 py-2 rounded-xl max-w-[80%] text-sm shadow-sm
                    ${
                      msg.role === "user"
                        ? "bg-muted text-foreground dark:bg-zinc-700 dark:text-white"
                        : msg.role === "bot"
                        ? "bg-primary text-white dark:bg-blue-600"
                        : "bg-secondary text-secondary-foreground dark:bg-zinc-800 dark:text-white"
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-end">
                <Skeleton className="w-16 h-6 rounded-full" />
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className="
              p-3 border-t flex gap-2
              border-border dark:border-zinc-700
              bg-background dark:bg-zinc-900
            "
          >
            <input
              type="text"
              className="
                flex-1 border rounded-lg px-3 py-2
                bg-background text-foreground
                dark:bg-zinc-800 dark:text-white dark:border-zinc-600
                focus:outline-none focus:ring-2 focus:ring-primary
              "
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="
                px-4 py-2 rounded-lg
                bg-primary text-white
                dark:bg-blue-600
                hover:opacity-90 transition
              "
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}