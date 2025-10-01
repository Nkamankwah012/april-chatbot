import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome?: () => void;
  shouldLoadPrevious?: boolean;
}

export const ChatTab = ({ initialMessage, onBackToHome }: ChatTabProps) => {
  const initRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initRef.current) {
      console.log('[ChatTab] Already initialized, skipping');
      return;
    }
    
    console.log('[ChatTab] Starting Botpress initialization...');
    
    const waitForBotpress = async () => {
      console.log('[ChatTab] Waiting for window.botpress to load...');
      let attempts = 0;
      while (!(window as any).botpress && attempts < 100) {
        await new Promise((r) => setTimeout(r, 100));
        attempts++;
      }
      
      if ((window as any).botpress) {
        console.log('[ChatTab] ✅ window.botpress is available!');
      } else {
        console.error('[ChatTab] ❌ window.botpress not available after 10 seconds');
      }
      
      return (window as any).botpress;
    };

    const init = async () => {
      try {
        const bp = await waitForBotpress();
        if (!bp) {
          console.error('[ChatTab] ❌ Botpress not available, cannot initialize');
          setIsLoading(false);
          return;
        }

        // Initialize once and keep it open
        if (!initRef.current) {
          console.log('[ChatTab] Initializing Botpress with config...');
          bp.init({
            botId: '4bc55b81-20c1-4907-95e8-b4eb5cc763ab',
            clientId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
            selector: '#botpress-webchat-container',
            configuration: {
              version: 'v2',
              botName: 'April',
              botAvatar: 'https://files.bpcontent.cloud/2025/09/21/21/20250921214137-IW2L3BVO.jpeg',
              botDescription: 'How can I help you today...',
              color: '#3276EA',
              variant: 'solid',
              headerVariant: 'glass',
              themeMode: 'light',
              fontFamily: 'inter',
              radius: 4,
              feedbackEnabled: true,
              soundEnabled: true,
            },
          });
          initRef.current = true;
          console.log('[ChatTab] ✅ Botpress init() called successfully');

          // Auto-open and send initial message
          bp.on?.('webchat:ready', () => {
            console.log('[ChatTab] 🎉 Botpress webchat:ready event fired!');
            bp.open?.();
            console.log('[ChatTab] Webchat opened');
            setIsLoading(false);
            
            if (initialMessage) {
              console.log('[ChatTab] Sending initial message:', initialMessage);
              setTimeout(() => {
                bp.sendMessage?.(initialMessage);
              }, 500);
            }
          });
        } else {
          console.log('[ChatTab] Already initialized, just opening');
          bp.open?.();
          setIsLoading(false);
        }
      } catch (error) {
        console.error('[ChatTab] ❌ Error during initialization:', error);
        setIsLoading(false);
      }
    };

    void init();
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

      {/* Botpress Chat Container - CDN Script Method */}
      <div ref={containerRef} className="flex-1 relative watermark-background">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <div className="text-center">
              <div className="animate-pulse mb-2">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
              </div>
              <p className="text-foreground-secondary">Loading chat...</p>
            </div>
          </div>
        )}
        <div id="botpress-webchat-container" className="w-full h-full" />
      </div>
    </div>
  );
};
