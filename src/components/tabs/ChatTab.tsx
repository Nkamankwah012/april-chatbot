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

  return <div id="webchat" style={{ width: '100%', height: '100%' }} />;
}

export default ChatTab;
