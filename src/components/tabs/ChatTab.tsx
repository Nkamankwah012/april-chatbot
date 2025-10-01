import { useEffect } from 'react';
import { Webchat } from '@botpress/webchat';
import aprilAvatar from '@/assets/april-avatar-new.jpg';

const clientId = '7a37af73-17ed-43ef-895a-1d77238c02e7';

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome: () => void;
  shouldLoadPrevious: boolean;
}

export function ChatTab({ initialMessage, onBackToHome, shouldLoadPrevious }: ChatTabProps) {
  useEffect(() => {
    // Hide any legacy CDN-based Botpress overlays if they were injected previously
    const style = document.createElement('style');
    style.innerHTML = `
      .bpFab, body > div[class*="bp-"], #bp-web-widget-container { display: none !important; }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  return (
    <div className="w-full h-full">
      <Webchat
        clientId={clientId}
        style={{ width: '100%', height: '100%' }}
        configuration={{
          botName: 'April',
          botAvatar: aprilAvatar,
          botDescription: 'How can I help you today...',
          composerPlaceholder: 'Type your message...',
        }}
      />
    </div>
  );
}

export default ChatTab;
