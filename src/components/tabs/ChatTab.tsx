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

  useEffect(() => {
    let cancelled = false;

    const waitForScript = async () => {
      let attempts = 0;
      while (!(window as any).botpress && attempts < 100 && !cancelled) {
        await new Promise((r) => setTimeout(r, 100));
        attempts++;
      }
      return (window as any).botpress;
    };

    const init = async () => {
      const bp = await waitForScript();
      if (!bp || cancelled) return;

      if (!initRef.current && !(window as any).__bpInitialized) {
        // Register open-on-ready BEFORE init to avoid missing the event
        bp.on?.('webchat:initialized', () => {
          setTimeout(() => {
            bp.open?.();
          }, 300);
        });

        bp.init({
          botId: '4bc55b81-20c1-4907-95e8-b4eb5cc763ab',
          clientId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
          configuration: {
            botName: 'April',
            botAvatar: 'https://files.bpcontent.cloud/2025/09/21/21/20250921214137-IW2L3BVO.jpeg',
            botDescription: 'How can I help you today...',
            color: '#3276EA',
            variant: 'solid',
            themeMode: 'light',
            fontFamily: 'inter',
            radius: 4,
            feedbackEnabled: true,
            soundEnabled: true,
          },
        });

        (window as any).__bpInitialized = true;
        initRef.current = true;
      } else {
        // Already initialized: ensure it's open
        bp.open?.();
      }
    };

    void init();

    return () => {
      cancelled = true;
    };
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

      {/* The webchat renders as a floating widget; we simply ensure it's opened so the tab isn't blank */}
      <div className="flex-1 relative" />
    </div>
  );
};
