import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, RefreshCw, ArrowLeft } from "lucide-react";
import aprilAvatar from "@/assets/april-new-avatar.jpg";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome?: () => void;
}

export const ChatTab = ({ initialMessage, onBackToHome }: ChatTabProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      sendMessage(initialMessage);
    }
  }, [initialMessage]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('botpress-chat', {
        body: { message }
      });

      if (error) {
        console.error('Error calling Botpress:', error);
        throw error;
      }

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response?.payload?.text || "I received your message!",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const resetConversation = () => {
    setMessages([]);
    setInputMessage("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Assistant Header */}
      <div className="p-4 border-b border-border/30 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          {onBackToHome && (
            <Button variant="ghost" size="sm" onClick={onBackToHome} className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <Avatar className="w-10 h-10">
            <AvatarImage src={aprilAvatar} alt="April" className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm">
              A
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">April</h3>
            <p className="text-sm text-foreground-secondary">Your AirCare virtual assistant</p>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-white shadow-lg">
                <AvatarImage src={aprilAvatar} alt="April" className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg">
                  A
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold text-foreground mb-2">April</h3>
              <p className="text-muted-foreground">Your Aircare virtual assistant.</p>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start items-start space-x-2'}`}
            >
              {!message.isUser && (
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={aprilAvatar} alt="April" className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                    A
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground ml-4'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start items-start space-x-2">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={aprilAvatar} alt="April" className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                  A
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                <p className="text-sm">April is typing...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-border/30">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="relative flex-1">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetConversation}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};