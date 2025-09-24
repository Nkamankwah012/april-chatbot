import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome?: () => void;
  shouldLoadPrevious?: boolean;
}

export const ChatTab = ({ initialMessage, onBackToHome }: ChatTabProps) => {
  // Initialize Botpress WebChat once, and send initial messages whenever provided
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      // Wait for the Botpress WebChat script to be ready
      let attempts = 0;
      while (!(window as any).botpressWebChat && attempts < 50) {
        await new Promise((r) => setTimeout(r, 100));
        attempts++;
      }

      const bpw = (window as any).botpressWebChat;
      if (!mounted || !bpw) {
        console.error('Botpress WebChat not loaded');
        return;
      }

      // Ensure a clean mount each time this tab is shown
      const el = document.querySelector('#webchat');
      if (el) (el as HTMLElement).innerHTML = '';

      // Initialize embedded webchat inside #webchat
      bpw.init({
        botId: '4bc55b81-20c1-4907-95e8-b4eb5cc763ab',
        clientId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
        messagingUrl: 'https://messaging.botpress.cloud',
        container: '#webchat',
        hideWidget: true,
        theme: 'light',
      });

      // If an initial message exists, send it after init
      if (initialMessage) {
        setTimeout(() => {
          try {
            bpw.sendEvent({ type: 'MESSAGE', text: initialMessage });
          } catch (e) {
            console.error('Failed to send initial message', e);
          }
        }, 300);
      }
    };

    init();

    return () => {
      mounted = false;
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