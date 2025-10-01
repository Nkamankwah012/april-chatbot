import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Webchat } from '@botpress/webchat';

interface ChatTabProps {
  initialMessage?: string;
  onBackToHome?: () => void;
  shouldLoadPrevious?: boolean;
}

export const ChatTab = ({ initialMessage, onBackToHome }: ChatTabProps) => {
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

      {/* Botpress Webchat (React SDK) */}
      <div className="flex-1 relative watermark-background">
        <Webchat
          clientId="7a37af73-17ed-43ef-895a-1d77238c02e7"
          style={{ width: '100%', height: '100%', display: 'flex' }}
        />
      </div>
    </div>
  );
};
