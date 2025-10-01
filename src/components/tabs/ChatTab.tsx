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
        disableAnimations: false,
        closeOnEscape: false,
        containerWidth: '100%',
        layoutWidth: '100%'
      });
      
      window.botpressWebChat.onEvent(() => {
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
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      <div id="bp-web-widget-container" className="w-full h-full" />
    </div>
  );
}

export default ChatTab;
