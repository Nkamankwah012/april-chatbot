import { useEffect, useState } from 'react';

declare global {
  interface Window {
    botpressWebChat: any;
  }
}

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome?: () => void;
  shouldLoadPrevious?: boolean;
}

export const ChatTab = ({ 
  initialMessage, 
  onBackToHome, 
  shouldLoadPrevious 
}: ChatTabProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Clean up any existing Botpress instance
    if (window.botpressWebChat) {
      window.botpressWebChat.sendEvent({ type: 'hide' });
    }

    // Load Botpress script
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script.async = true;
    
    script.onload = () => {
      try {
        // Initialize Botpress with your configuration
        window.botpressWebChat.init({
          composerPlaceholder: "Type your message...",
          botConversationDescription: "Powered by Botpress",
          botName: "April",
          botId: "7a37af73-17ed-43ef-895a-1d77238c02e7",
          hostUrl: "https://cdn.botpress.cloud/webchat/v2.2",
          messagingUrl: "https://messaging.botpress.cloud",
          clientId: "7a37af73-17ed-43ef-895a-1d77238c02e7",
          webhookId: "webhook-id",
          lazySocket: true,
          themeName: "prism",
          frontendVersion: "v2.2",
          showPoweredBy: true,
          theme: "prism",
          themeColor: "#2563eb",
          hideWidget: true,
          disableAnimations: false,
          closeOnEscape: false,
          showConversationsButton: false,
          enableTranscriptDownload: false,
          className: "webchatIframe",
          containerWidth: "100%",
          layoutWidth: "100%",
          showCloseButton: false
        });

        // Open the chat widget
        window.botpressWebChat.sendEvent({ type: 'show' });
        
        // Send initial message if provided
        if (initialMessage && !shouldLoadPrevious) {
          setTimeout(() => {
            window.botpressWebChat.sendEvent({ 
              type: 'proactive-trigger',
              channel: 'web',
              payload: { text: initialMessage }
            });
          }, 1000);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize Botpress:', err);
        setError('Failed to load chat assistant');
        setIsLoading(false);
      }
    };

    script.onerror = () => {
      setError('Failed to load chat script');
      setIsLoading(false);
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (window.botpressWebChat) {
        window.botpressWebChat.sendEvent({ type: 'hide' });
      }
    };
  }, [initialMessage, shouldLoadPrevious]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-destructive mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-background">
      {/* Header */}
      {onBackToHome && (
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
      )}

      {/* Chat Container */}
      <div id="botpress-webchat-container" className="w-full" style={{ height: onBackToHome ? 'calc(100% - 72px)' : '100%' }}>
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading chat assistant...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
