import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome?: () => void;
  shouldLoadPrevious?: boolean;
}

export const ChatTab = ({ initialMessage, onBackToHome }: ChatTabProps) => {
  const initRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initRef.current) return;

    console.log('[ChatTab] Loading Botpress v0 script...');
    
    // Load Botpress v0 script
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v0/inject.js';
    script.async = true;
    
    script.onload = () => {
      console.log('[ChatTab] Script loaded, waiting for botpressWebChat...');
      
      const initBotpress = () => {
        const bp = (window as any).botpressWebChat;
        if (bp) {
          console.log('[ChatTab] Initializing Botpress v0...');
          
          try {
            bp.init({
              hostUrl: 'https://cdn.botpress.cloud/webchat/v0',
              botId: '4bc55b81-20c1-4907-95e8-b4eb5cc763ab',
              clientId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
              hideWidget: true,
              containerWidth: '100%',
              layoutWidth: '100%',
            });
            
            initRef.current = true;
            setIsLoading(false);
            console.log('[ChatTab] Botpress initialized successfully');
            
            // Send initial message if provided
            if (initialMessage) {
              setTimeout(() => {
                (window as any).botpressWebChat?.sendEvent({
                  type: 'proactive-trigger',
                  channel: 'web',
                  payload: { text: initialMessage }
                });
              }, 1000);
            }
          } catch (error) {
            console.error('[ChatTab] Initialization error:', error);
            setIsLoading(false);
          }
        } else {
          console.log('[ChatTab] botpressWebChat not ready, retrying...');
          setTimeout(initBotpress, 100);
        }
      };
      
      initBotpress();
    };
    
    script.onerror = () => {
      console.error('[ChatTab] Failed to load Botpress script');
      setIsLoading(false);
    };
    
    document.body.appendChild(script);
    
    // Cleanup
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [initialMessage]);

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
            <div className="w-2 h-2 rounded-full bg-green-400" />
          </div>
        </div>
      )}

      {/* Botpress Chat Container - v0 CDN */}
      <div className="flex-1 relative watermark-background">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-foreground-secondary">Loading chat...</p>
            </div>
          </div>
        )}
        <div id="bp-web-widget-container" className="w-full h-full" />
      </div>
    </div>
  );
};
