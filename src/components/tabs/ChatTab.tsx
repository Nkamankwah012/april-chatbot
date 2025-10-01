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
    // Create container div for Botpress
    const container = document.getElementById('bp-web-widget-container');
    if (!container) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v0/inject.js';
    script.async = true;
    
    document.body.appendChild(script);
    
    script.onload = () => {
      window.botpressWebChat.init({
        botId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v0',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
        hideWidget: true,
        containerWidth: '100%',
        layoutWidth: '100%',
        showPoweredBy: false,
        disableAnimations: false,
        composerPlaceholder: 'Type your message...'
      });
      
      window.botpressWebChat.onEvent(() => {
        window.botpressWebChat.sendEvent({ type: 'show' });
        setIsLoading(false);
      }, ['LIFECYCLE.LOADED']);
    };

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header - April branding */}
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
      
      {/* Botpress Chat Container - EMBEDDED */}
      <div className="flex-1 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading April...</p>
            </div>
          </div>
        )}
        <div id="bp-web-widget-container" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}

export default ChatTab;
