import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome?: () => void;
  shouldLoadPrevious?: boolean;
}

export const ChatTab = ({ initialMessage, onBackToHome }: ChatTabProps) => {
  // Initialize Botpress WebChat once, and send initial messages whenever provided
  // Initialize Botpress once on mount; don't re-init on message changes
  useEffect(() => {
    let mounted = true;
    const initializedFlag = '__aircare_bpw_initialized__';

    const ensureScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if ((window as any).botpressWebChat) return resolve();

        const existing = document.querySelector('script[data-aircare-botpress]') as HTMLScriptElement | null;
        if (!existing) {
          const s = document.createElement('script');
          s.src = 'https://cdn.botpress.cloud/webchat/v3.2/inject.js';
          s.async = true;
          s.defer = true;
          s.setAttribute('data-aircare-botpress', 'true');
          s.onload = () => resolve();
          s.onerror = () => reject(new Error('Failed to load Botpress script'));
          document.head.appendChild(s);
        }

        // Poll until the global becomes available
        let tries = 0;
        const interval = setInterval(() => {
          if (!mounted) {
            clearInterval(interval);
            return reject(new Error('Unmounted while loading Botpress'));
          }
          if ((window as any).botpressWebChat) {
            clearInterval(interval);
            resolve();
          } else if (++tries > 100) {
            clearInterval(interval);
            reject(new Error('Botpress script failed to initialize'));
          }
        }, 100);
      });
    };

    const init = async () => {
      try {
        await ensureScript();

        // Wait a bit to ensure internals are ready
        let attempts = 0;
        while (!(window as any).botpressWebChat && attempts < 100 && mounted) {
          await new Promise((r) => setTimeout(r, 100));
          attempts++;
        }

        const bpw = (window as any).botpressWebChat;
        if (!mounted || !bpw) {
          console.error('Botpress WebChat not loaded');
          return;
        }

        // Avoid re-initializing if already done
        if ((window as any)[initializedFlag]) return;

        bpw.init({
          botId: '4bc55b81-20c1-4907-95e8-b4eb5cc763ab',
          clientId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
          messagingUrl: 'https://messaging.botpress.cloud',
          container: '#webchat',
          hideWidget: true,
          theme: 'light',
        });

        (window as any)[initializedFlag] = true;
      } catch (e) {
        console.error('Failed to initialize Botpress', e);
      }
    };

    init();
    return () => {
      mounted = false;
    };
  }, []);

  // Send initial messages without re-initializing
  useEffect(() => {
    if (!initialMessage) return;

    let cancelled = false;
    const trySend = async () => {
      let attempts = 0;
      while (!(window as any).botpressWebChat && attempts < 100 && !cancelled) {
        await new Promise((r) => setTimeout(r, 100));
        attempts++;
      }
      if (cancelled) return;
      const bpw = (window as any).botpressWebChat;
      if (!bpw) return;
      setTimeout(() => {
        try {
          bpw.sendEvent({ type: 'MESSAGE', text: initialMessage });
        } catch (e) {
          console.error('Failed to send initial message', e);
        }
      }, 200);
    };

    trySend();
    return () => {
      cancelled = true;
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
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
        </div>
      )}
      
      {/* Botpress Chat Container */}
      <div className="flex-1 p-4">
        <div id="webchat" style={{ width: '100%', height: '100%' }}></div>
      </div>
    </div>
  );
};