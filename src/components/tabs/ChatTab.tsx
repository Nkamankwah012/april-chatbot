import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { useEffect, useState } from "react";

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome?: () => void;
  shouldLoadPrevious?: boolean;
}

declare global {
  interface Window {
    botpressWebChat: any;
    sendMessageToBotpress: (text: string) => void;
    botpressMessageHandler: (text: string) => void;
    botpress?: any;
  }
}

export const ChatTab = ({ initialMessage, onBackToHome, shouldLoadPrevious }: ChatTabProps) => {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot'; text: string }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set up message handler for bot responses
    window.botpressMessageHandler = (messageText: string) => {
      console.log('Received message from bot:', messageText);
      setMessages(prev => [...prev, { type: 'bot', text: messageText }]);
    };

    // Check if Botpress is ready
    const checkReady = setInterval(() => {
      if (window.botpressWebChat && window.sendMessageToBotpress) {
        console.log('Botpress is ready');
        setIsReady(true);
        clearInterval(checkReady);
        
        // Send initial message if provided
        if (initialMessage) {
          handleSendMessage(initialMessage);
        }
      }
    }, 100);

    return () => {
      clearInterval(checkReady);
    };
  }, [initialMessage]);

  // Debug: check which Botpress APIs are available and try sending tests
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        console.log('Checking Botpress objects:');
        console.log('window.botpressWebChat:', window.botpressWebChat);
console.log('window.botpress:', window.botpress);

        if (window.botpressWebChat && typeof window.botpressWebChat.sendEvent === 'function') {
          console.log('Sending test via sendEvent');
          window.botpressWebChat.sendEvent({ type: 'MESSAGE', text: 'test1' });
        }

        // Some versions expose sendMessage
        if (window.botpressWebChat && typeof (window.botpressWebChat as any).sendMessage === 'function') {
          console.log('Sending test via sendMessage');
          (window.botpressWebChat as any).sendMessage('test2');
        }

if (window.botpress && typeof window.botpress.sendMessage === 'function') {
  console.log('Sending test via botpress.sendMessage');
  window.botpress.sendMessage('test3');
}
      } catch (e) {
        console.error('Botpress debug check failed:', e);
      }
    }, 3000);

    return () => clearTimeout(id);
  }, []);

  const handleSendMessage = (message: string) => {
    if (!message.trim() || !isReady) return;

    console.log('Sending message:', message);
    setMessages(prev => [...prev, { type: 'user', text: message }]);
    
    try {
      window.sendMessageToBotpress(message);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { type: 'bot', text: "I'm having trouble connecting right now. Please try again." }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with back button */}
      {onBackToHome && (
        <div className="p-4 border-b border-border/30 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBackToHome} className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">April</h3>
              <p className="text-sm text-foreground-secondary">Your AirCare virtual assistant</p>
            </div>
            <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-400' : 'bg-gray-400'}`}></div>
          </div>
        </div>
      )}
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p>Hi! I'm April, your AirCare virtual assistant.</p>
            <p>How can I help you today?</p>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="border-t border-border/30 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isReady ? "Type your message..." : "Connecting..."}
            disabled={!isReady}
            className="flex-1"
          />
          <Button type="submit" disabled={!isReady || !inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};