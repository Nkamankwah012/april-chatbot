import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome?: () => void;
  shouldLoadPrevious?: boolean;
}

// Reconnect Botpress using the provided CDN + window.botpress API
export const ChatTab = ({ initialMessage, onBackToHome }: ChatTabProps) => {
  useEffect(() => {
    let mounted = true;
    const initializedFlag = '__aircare_botpress_initialized__';

    const waitForBotpress = async (timeoutMs = 20000) => {
      const start = Date.now();
      while (mounted && !(window as any).botpress && Date.now() - start < timeoutMs) {
        await new Promise((r) => setTimeout(r, 100));
      }
      return (window as any).botpress as any | undefined;
    };

    const onReady = () => {
      try {
        (window as any).botpress?.open?.();
      } catch {}
    };

    const init = async () => {
      const bp = await waitForBotpress();
      if (!mounted || !bp) {
        console.error('Botpress global missing');
        return;
      }

      // Attach once
      try {
        bp.off?.('webchat:ready', onReady);
      } catch {}
      bp.on?.('webchat:ready', onReady);

      if (!(window as any)[initializedFlag]) {
        bp.init({
          botId: '4bc55b81-20c1-4907-95e8-b4eb5cc763ab',
          clientId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
          selector: '#webchat',
          configuration: {
            version: 'v2',
            botName: 'April',
            botAvatar: 'https://files.bpcontent.cloud/2025/09/21/21/20250921214137-IW2L3BVO.jpeg',
            botDescription: 'How can I  help you today...',
            fabImage: 'https://files.bpcontent.cloud/2025/09/19/21/20250919214955-ITA8SVEK.jpeg',
            website: {},
            email: {},
            phone: {},
            termsOfService: {},
            privacyPolicy: {},
            color: '#3276EA',
            variant: 'solid',
            headerVariant: 'glass',
            themeMode: 'light',
            fontFamily: 'inter',
            radius: 4,
            feedbackEnabled: true,
            footer: '[⚡ by Botpress](https://botpress.com/?from=webchat)',
            soundEnabled: true,
          },
        });
        (window as any)[initializedFlag] = true;
      } else {
        // If already initialized, ensure it opens and rebinds to container
        try { bp.open?.(); } catch {}
      }

      // Optional: send initial message once chat is ready
      if (initialMessage) {
        setTimeout(() => {
          try { bp.sendMessage?.(initialMessage); } catch {}
        }, 500);
      }
    };

    void init();
    return () => {
      mounted = false;
      try { (window as any).botpress?.off?.('webchat:ready', onReady); } catch {}
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

      {/* Botpress Chat Container */}
      <div className="flex-1 p-4 relative">
        {/* Watermark Background */}
        <div className="watermark-background"></div>
        <div id="webchat" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 10 }} />
      </div>
    </div>
  );
};
