import { useEffect, useRef } from "react";

interface ChatTabProps {
  initialMessage?: string;
}

export const ChatTab = ({ initialMessage }: ChatTabProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (initialMessage && iframeRef.current) {
      // Send initial message to Botpress iframe when it's loaded
      const sendMessage = () => {
        try {
          iframeRef.current?.contentWindow?.postMessage({
            type: 'sendMessage',
            text: initialMessage
          }, '*');
        } catch (error) {
          console.log('Could not send initial message to Botpress');
        }
      };

      // Wait a bit for iframe to load then send message
      setTimeout(sendMessage, 2000);
    }
  }, [initialMessage]);

  return (
    <div className="h-full flex flex-col">
      {/* Assistant Header */}
      <div className="p-4 border-b border-border/30 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">April</h3>
            <p className="text-sm text-foreground-secondary">Your AirCare virtual assistant</p>
          </div>
          <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>

      {/* Botpress Chat Iframe */}
      <div className="flex-1">
        <iframe
          ref={iframeRef}
          src="https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/09/17/20/20250917203724-JARJATWQ.json"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="AirCare Assistant Chat"
        />
      </div>
    </div>
  );
};