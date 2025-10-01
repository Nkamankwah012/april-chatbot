import { Webchat } from '@botpress/webchat';

const clientId = '7a37af73-17ed-43ef-895a-1d77238c02e7';

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome: () => void;
  shouldLoadPrevious: boolean;
}

export function ChatTab({ initialMessage, onBackToHome, shouldLoadPrevious }: ChatTabProps) {
  return (
    <div className="w-full h-full">
      <Webchat
        clientId={clientId}
        style={{ width: '100%', height: '100%' }}
        configuration={{
          botName: 'April',
          composerPlaceholder: 'Type your message...'
        }}
      />
    </div>
  );
}

export default ChatTab;
