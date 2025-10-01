import { useEffect, useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Clean up any existing Botpress instance
    if (window.botpressWebChat) {
      try {
        window.botpressWebChat.sendEvent({ type: 'hide' });
      } catch (e) {
        console.log('Cleaning up previous instance');
      }
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v2/inject.js';
    script.async = true;
    
    document.body.appendChild(script);
    
    script.onload = () => {
      const initConfig = {
        composerPlaceholder: "Type your message...",
        botConversationDescription: "Powered by Botpress",
        botId: "7a37af73-17ed-43ef-895a-1d77238c02e7",
        hostUrl: "https://cdn.botpress.cloud/webchat/v2",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "7a37af73-17ed-43ef-895a-1d77238c02e7",
        lazySocket: true,
        themeName: "prism",
        frontendVersion: "v2",
        showPoweredBy: false,
        theme: "prism",
        themeColor: "#f97316",
        allowedOrigins: [],
        enableConversationDeletion: true,
        showBotInfoPage: false,
        showConversationsButton: false,
        enableTranscriptDownload: false,
        closeOnEscape: false
      };

      window.botpressWebChat.init(initConfig);
      
      // Force open the chat
      setTimeout(() => {
        window.botpressWebChat.onEvent(() => {
          setIsLoading(false);
        }, ['LIFECYCLE.READY']);
      }, 100);
    };

    script.onerror = () => {
      console.error('Failed to load Botpress script');
      setIsLoading(false);
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
      <div className="flex items-center justify-between p-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">April</h2>
            <p className="text-xs text-muted-foreground">Your AirCare virtual assistant</p>
          </div>
        </div>
      </div>
      
      {/* Chat Container */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading April...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatTab;
