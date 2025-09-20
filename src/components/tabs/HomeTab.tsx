import { ArrowRight, Phone, MessageSquare, Calendar, FileText } from "lucide-react";

interface HomeTabProps {
  onStartChat: () => void;
}

export const HomeTab = ({ onStartChat }: HomeTabProps) => {
  return (
    <div className="p-6 h-full flex flex-col space-y-6">
      {/* Greeting Section */}
      <div className="text-center space-y-2 animate-fade-in">
        <h2 className="text-xl font-semibold text-foreground">
          Hi there! 👋
        </h2>
        <p className="text-foreground-secondary text-sm">
          How can we help you today?
        </p>
      </div>

      {/* Primary Action */}
      <div className="animate-bounce-in animation-delay-200">
        <button
          onClick={onStartChat}
          className="gradient-button w-full flex items-center justify-center space-x-2 text-base"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Ask a Question</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-3 animate-fade-in animation-delay-400">
        <button className="glass-card p-4 text-center space-y-2 hover:scale-105 transition-transform">
          <Calendar className="w-6 h-6 text-primary mx-auto" />
          <span className="text-sm font-medium text-foreground">Book Diagnostic</span>
        </button>
        <button className="glass-card p-4 text-center space-y-2 hover:scale-105 transition-transform">
          <FileText className="w-6 h-6 text-primary mx-auto" />
          <span className="text-sm font-medium text-foreground">Request Estimate</span>
        </button>
      </div>

      {/* Recent Conversation Card */}
      <div className="glass-card p-4 space-y-3 animate-fade-in animation-delay-600">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Continue Recent Conversation</h3>
          <ArrowRight className="w-4 h-4 text-foreground-muted" />
        </div>
        <p className="text-sm text-foreground-secondary">
          "I'm having issues with my AC unit not cooling properly..."
        </p>
        <div className="flex items-center justify-between text-xs text-foreground-muted">
          <span>with April</span>
          <span>2 hours ago</span>
        </div>
      </div>

      {/* Live Call Card */}
      <div className="glass-card p-4 space-y-3 animate-fade-in animation-delay-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">Start a Live Call</h3>
            <p className="text-sm text-foreground-secondary">
              Speak directly with our technicians
            </p>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};