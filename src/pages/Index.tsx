import { FloatingChatWidget } from "@/components/FloatingChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <FloatingChatWidget />
      </div>
    </div>
  );
};

export default Index;
