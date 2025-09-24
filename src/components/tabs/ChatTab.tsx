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

    const init = async () => {
      // Wait for Botpress WebChat script to be ready
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
    };

    init();
    return () => {
      mounted = false;
    };
  }, []);

  // Send initial messages without re-initializing
  useEffect(() => {
    if (!initialMessage) return;
    const bpw = (window as any).botpressWebChat;
    if (!bpw) return;
    setTimeout(() => {
      try {
        bpw.sendEvent({ type: 'MESSAGE', text: initialMessage });
      } catch (e) {
        console.error('Failed to send initial message', e);
      }
    }, 300);
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