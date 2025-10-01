import { useState, useEffect } from 'react';

export default function ChatTab() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Botpress CDN v0 (MUST be v0 for embedded chat)
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v0/inject.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize Botpress
      window.botpressWebChat.init({
        hostUrl: 'https://cdn.botpress.cloud/webchat/v0',
        botId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
        hideWidget: true,
        containerWidth: '100%',
        layoutWidth: '100%',
        showPoweredBy: false,
        stylesheet: 'https://cdn.botpress.cloud/webchat/v0/themes/default.css'
      });
      
      setIsLoading(false);
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {isLoading && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Loading AirCare assistant...
        </div>
      )}
      <div 
        id="bp-web-widget-container" 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
