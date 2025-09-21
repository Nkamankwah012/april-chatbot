import { useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm April, your AirCare virtual assistant. How can I help you with your HVAC system today?",
    sender: "assistant",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: "2", 
    content: "Hi! My AC unit isn't cooling properly. It's been running but the house stays warm.",
    sender: "user",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "3",
    content: "I understand that's frustrating! Let me help you troubleshoot this. First, can you check if your air filter needs replacing? A dirty filter can significantly reduce cooling efficiency.",
    sender: "assistant",
    timestamp: new Date(Date.now() - 30000),
  },
];

export const ChatTab = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for that information! Let me help you with the next steps to resolve this issue.",
        sender: "assistant", 
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Assistant Header */}
      <div className="p-4 border-b border-border/30 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">April</h3>
            <p className="text-sm text-foreground-secondary">Your AirCare virtual assistant</p>
          </div>
          <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={
                message.sender === "assistant"
                  ? "chat-bubble-assistant"
                  : "chat-bubble-user"
              }
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="chat-bubble-assistant">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce animation-delay-100"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce animation-delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/30 bg-white/50 backdrop-blur-sm">
        <div className="flex items-end space-x-2">
          <Button variant="ghost" size="icon" className="text-foreground-muted hover:text-foreground">
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="w-full min-h-[44px] max-h-32 px-4 py-3 pr-12 rounded-2xl border border-border/50 
                         bg-white/80 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 
                         focus:ring-primary/50 text-sm placeholder:text-foreground-muted"
              rows={1}
            />
          </div>
          
          <Button variant="ghost" size="icon" className="text-foreground-muted hover:text-foreground">
            <Mic className="w-4 h-4" />
          </Button>
          
          <Button 
            onClick={handleSendMessage}
            size="icon" 
            className="gradient-button rounded-full w-10 h-10 p-0"
            disabled={!inputMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};