import { useEffect } from 'react';

declare global {
  interface Window {
    botpress: any;
  }
}

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome: () => void;
  shouldLoadPrevious: boolean;
}

export function ChatTab({ initialMessage, onBackToHome, shouldLoadPrevious }: ChatTabProps) {
  useEffect(() => {
    // Add custom styles to force inline embedding
    const style = document.createElement('style');
    style.innerHTML = `
      /* Hide the floating bubble completely */
      .bpFab, #webchat .bpFab, button[aria-label="Toggle Chat Window"] {
        display: none !important;
      }
      
      /* Force webchat to be inline and contained */
      #webchat {
        position: relative !important;
        overflow: hidden !important;
      }
      
      #webchat > div,
      #webchat .bpWebchat,
      #webchat iframe {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        height: 100% !important;
        max-width: 100% !important;
        max-height: 100% !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Override any fixed positioning from Botpress */
      body > div[class*="bp-"] {
        display: none !important;
      }
      
      #webchat div[class*="bp-"] {
        display: block !important;
        position: relative !important;
      }
    `;
    document.head.appendChild(style);

    // Load Botpress script
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v3.3/inject.js';
    script.async = true;
    
    script.onload = () => {
      window.botpress.on("webchat:ready", () => {
        window.botpress.open();
      });
      
      window.botpress.init({
        "botId": "4bc55b81-20c1-4907-95e8-b4eb5cc763ab",
        "configuration": {
          "version": "v2",
          "botName": "April",
          "botAvatar": "https://files.bpcontent.cloud/2025/09/21/21/20250921214137-IW2L3BVO.jpeg",
          "botDescription": "How can I help you today...",
          "fabImage": "https://files.bpcontent.cloud/2025/09/19/21/20250919214955-ITA8SVEK.jpeg",
          "website": {},
          "email": {},
          "phone": {},
          "termsOfService": {},
          "privacyPolicy": {},
          "color": "#3276EA",
          "variant": "solid",
          "headerVariant": "glass",
          "themeMode": "light",
          "fontFamily": "inter",
          "radius": 4,
          "feedbackEnabled": true,
          "footer": "[⚡ by Botpress](https://botpress.com/?from=webchat)",
          "soundEnabled": true
        },
        "clientId": "7a37af73-17ed-43ef-895a-1d77238c02e7",
        "selector": "#webchat"
      });
    };
    
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div id="webchat" className="w-full h-full" />
  );
}

export default ChatTab;
