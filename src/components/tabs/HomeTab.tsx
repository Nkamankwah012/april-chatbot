import { ArrowRight, Phone, MessageSquare, Calendar, FileText } from "lucide-react";
import aircareLogoImg from "@/assets/aircare-logo.jpeg";
import { conversationStorage } from "@/lib/conversationStorage";

interface HomeTabProps {
  onStartChat: () => void;
  onBookDiagnostic: () => void;
  onRequestEstimate: () => void;
  onContinueConversation: () => void;
}

export const HomeTab = ({ onStartChat, onBookDiagnostic, onRequestEstimate, onContinueConversation }: HomeTabProps) => {
  const hasRecentConversation = conversationStorage.hasRecentConversation();
  const recentConversation = conversationStorage.getUserConversation();
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Wave Header Background - Refined Height */}
      <div className="wave-header-refined relative">
        {/* Logo and Greeting */}
        <div className="relative z-10 pt-4 pb-5 px-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <img 
                src={aircareLogoImg} 
                alt="AirCare Logo" 
                className="w-24 h-auto object-contain"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                Hi, there!
              </h1>
              <p className="text-white/90 text-base drop-shadow-md">
                How can we help you today??
              </p>
            </div>
          </div>
        </div>
        
        {/* Enhanced Wave Shape */}
        <div className="wave-shape-enhanced"></div>
      </div>

      {/* Scrollable Content Area with Watermark Background */}
      <div className="flex-1 relative bg-gradient-to-b from-background via-background to-muted/30 overflow-y-auto">
        {/* Watermark Background */}
        <div className="watermark-background"></div>
        
        {/* Floating Content */}
        <div className="relative z-10 px-6 py-6 space-y-5 pb-8">
          {/* Primary Action - Right-sized Button */}
          <div className="animate-fade-in animation-delay-200">
            <button
              onClick={onStartChat}
              className="gradient-button-refined w-full flex items-center justify-center space-x-3 text-sm py-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="font-semibold">Ask a Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Secondary Actions - Properly Sized Buttons */}
          <div className="grid grid-cols-2 gap-3 animate-fade-in animation-delay-400">
            <button 
              onClick={onBookDiagnostic}
              className="floating-card secondary-button-refined group"
            >
              <Calendar className="w-4 h-4 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-foreground">Book Diagnostic</span>
            </button>
            <button 
              onClick={onRequestEstimate}
              className="floating-card secondary-button-refined group"
            >
              <FileText className="w-4 h-4 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-foreground">Request Estimate</span>
            </button>
          </div>

          {/* Continue Conversation Card - Floating */}
          {hasRecentConversation && recentConversation && (
            <div 
              onClick={onContinueConversation}
              className="floating-card conversation-card animate-fade-in animation-delay-600 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground text-sm">Continue Recent Conversation</h3>
                <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-foreground-secondary mb-3 line-clamp-2">
                "{recentConversation.preview}"
              </p>
              <div className="flex items-center justify-between text-xs text-foreground-muted">
                <span className="font-medium">with April</span>
                <span>{conversationStorage.getTimeAgo()}</span>
              </div>
            </div>
          )}

          {/* New Chat Prompt - Shows when no recent conversation */}
          {!hasRecentConversation && (
            <div className="floating-card conversation-card animate-fade-in animation-delay-600 group cursor-pointer opacity-60">
              <div className="flex items-center justify-center py-4">
                <p className="text-xs text-foreground-secondary text-center">
                  No recent conversation found.<br />
                  Start a new chat above to begin!
                </p>
              </div>
            </div>
          )}

          {/* Live Call Card - Floating */}
          <div 
            onClick={() => window.location.href = 'tel:+14084432613'}
            className="floating-card conversation-card animate-fade-in animation-delay-800 group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm mb-1">Start a Live Call</h3>
                <p className="text-xs text-foreground-secondary">
                  Speak directly to an Air Care representative
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};