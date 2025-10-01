import { Webchat } from '@botpress/webchat';
import aprilAvatar from '@/assets/april-avatar-new.jpg';

const clientId = '7a37af73-17ed-43ef-895a-1d77238c02e7';

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome: () => void;
  shouldLoadPrevious: boolean;
}

export function ChatTab(_props: ChatTabProps) {
  return (
    <div className="w-full h-full" style={{ width: '100%', height: '100%', minHeight: 420 }}>
      <Webchat
        clientId={clientId}
        style={{ width: '100%', height: '100%' }}
        configuration={{
          botName: 'April',
          botAvatar: aprilAvatar,
          composerPlaceholder: 'Type your message...',
        }}
      />
    </div>
  );
}

export default ChatTab;

