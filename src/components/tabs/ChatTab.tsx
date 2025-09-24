import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome?: () => void;
  shouldLoadPrevious?: boolean;
}

export const ChatTab = ({ initialMessage, onBackToHome }: ChatTabProps) => {
  // Initialize Botpress after this tab mounts so the #webchat container exists
  useEffect(() => {
    const init = () => {
      const bp = (window as any).botpress;
      if (bp) {
        bp.on('webchat:ready', () => {
          bp.open();
          // Send initial message if provided
          if (initialMessage) {
            setTimeout(() => {
              bp.sendEvent({ type: 'text', payload: { text: initialMessage } });
            }, 1000);
          }
        });
        bp.init({
          botId: '4bc55b81-20c1-4907-95e8-b4eb5cc763ab',
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
          clientId: '7a37af73-17ed-43ef-895a-1d77238c02e7',
          selector: '#webchat',
        });
      } else {
        console.error('Botpress not loaded yet');
      }
    };
    // Defer to ensure the container is mounted
    const t = setTimeout(init, 0);
    return () => clearTimeout(t);
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