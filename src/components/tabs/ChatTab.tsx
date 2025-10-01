import { Webchat } from '@botpress/webchat';

const clientId = "7a37af73-17ed-43ef-895a-1d77238c02e7";

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
        configuration={{
          botName: "April",
          botAvatar: "https://via.placeholder.com/40/f97316/ffffff?text=A",
          composerPlaceholder: "Type your message..."
        }}
      />
    </div>
  );
}

export default ChatTab;
