import { ArrowRight, Phone, MessageSquare, Calendar, FileText } from "lucide-react";

interface HomeTabProps {
  onStartChat: () => void;
}

export const HomeTab = ({ onStartChat }: HomeTabProps) => {
  return (
    <div className="h-full flex flex-col">
      {/* Curved Wave Header */}
      <div className="curved-wave-header animate-fade-in">
        <div className="logo-container mb-4">
          <span className="text-sm font-bold">AC</span>
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Hi, there!</h1>
          <p className="text-white/80 text-base">How can we help you today?</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 space-y-6 -mt-4 relative z-10">
        {/* Primary Action */}
        <div className="animate-bounce-in animation-delay-200">
          <button
            onClick={onStartChat}
            className="gradient-button w-full flex items-center justify-center space-x-3 text-base py-4"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Ask a Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="flex gap-3 animate-fade-in animation-delay-400">
          <button className="secondary-button text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Book Diagnostic
          </button>
          <button className="secondary-button text-sm">
            <FileText className="w-4 h-4 mr-2" />
            Request Estimate
          </button>
        </div>

        {/* Recent Conversation Card */}
        <div className="conversation-card p-4 space-y-3 animate-fade-in animation-delay-600">
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
        <div className="call-card p-4 space-y-3 animate-fade-in animation-delay-800">
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
    </div>
  );
};