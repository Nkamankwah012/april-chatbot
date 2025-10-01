import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const initBotpress = async () => {
      // Wait for botpress to load
      let attempts = 0;
      while (!window.botpressWebChat && attempts < 50) {
        await new Promise(r => setTimeout(r, 100));
        attempts++;
      }

      if (!window.botpressWebChat) {
        console.error('Botpress not loaded');
        return;
      }

      // Initialize only once
      if (!initRef.current) {
        window.botpressWebChat.init({
          botId: '4bc55b81-20c1-4907-95e8-b4eb5cc763ab',
          hostUrl: 'https://cdn.botpress.cloud/webchat/v2.2',
          messagingUrl: 'https://messaging.botpress.cloud',
          clientId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
          hideWidget: true,
          containerWidth: '100%',
          layoutWidth: '100%',
          showPoweredBy: false,
        });
        initRef.current = true;

        // Inject webchat into our container
        if (containerRef.current) {
          const webchatRoot = document.getElementById('bp-web-widget');
          if (webchatRoot) {
            containerRef.current.appendChild(webchatRoot);
          }
        }

        // Send initial message if provided
        if (initialMessage) {
          setTimeout(() => {
            window.botpressWebChat?.sendEvent({
              type: 'proactive-trigger',
              channel: 'web',
              payload: { text: initialMessage }
            });
          }, 1000);
        }
      }
    };

    initBotpress();
  }, [initialMessage]);

  return (
    <div className="h-full flex flex-col">
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

      <div ref={containerRef} className="flex-1 relative w-full h-full" />
    </div>
  );
};
