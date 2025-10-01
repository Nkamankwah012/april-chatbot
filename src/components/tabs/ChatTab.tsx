import { useEffect } from 'react';

declare global {
  interface Window {
    botpressWebChat: any;
  }
}

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome: () => void;
  shouldLoadPrevious: boolean;
}

export function ChatTab({ initialMessage, onBackToHome, shouldLoadPrevious }: ChatTabProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;
    
    document.body.appendChild(script);
    
    script.onload = () => {
      window.botpressWebChat.init({
        botId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '7a37af73-17ed-43ef-895a-1d77238c02e7'
      });
    };

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">April</h2>
            <p className="text-xs text-muted-foreground">Your AirCare virtual assistant</p>
          </div>
        </div>
      </div>
      
      {/* Webchat Container */}
      <div id="webchat" className="flex-1" />
    </div>
  );
}

export default ChatTab;
