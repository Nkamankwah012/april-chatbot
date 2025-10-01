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
    <Webchat
      clientId={clientId}
      style={{ 
        width: '100%', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      configuration={{
        botName: 'April',
        botAvatar: aprilAvatar,
        composerPlaceholder: 'Type your message...',
      }}
    />
  );
}

export default ChatTab;

