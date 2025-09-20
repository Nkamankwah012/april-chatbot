import { ArrowRight, Phone, MessageSquare, Calendar, FileText } from "lucide-react";
import aircareLogoImg from "@/assets/aircare-logo.jpeg";

interface HomeTabProps {
  onStartChat: () => void;
  onBookDiagnostic: () => void;
  onRequestEstimate: () => void;
}

export const HomeTab = ({ onStartChat, onBookDiagnostic, onRequestEstimate }: HomeTabProps) => {
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Animated Wave Header */}
      <div className="wave-header-animated relative">
        {/* Logo and Greeting */}
        <div className="relative z-10 pt-8 pb-16 px-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center p-2 shadow-lg">
              <img 
                src={aircareLogoImg} 
                alt="AirCare Logo" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="text-left space-y-2 pt-2">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                Hi, there!
              </h1>
              <p className="text-white/95 text-lg drop-shadow-md">
                How can we help you today??
              </p>
            </div>
          </div>
        </div>
        
        {/* Animated SVG Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg 
            className="relative block w-full h-16" 
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              className="wave-path-1"
              d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" 
              fill="hsl(var(--background))"
            />
            <path 
              className="wave-path-2"
              d="M0,60 C240,20 480,80 720,40 C960,20 1200,80 1440,40 L1440,100 L0,100 Z" 
              fill="hsl(var(--background))"
              fillOpacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Scrollable Content Area with Watermark Background */}
      <div className="flex-1 relative bg-gradient-to-b from-background via-background to-muted/30 overflow-y-auto scroll-smooth">
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
          <div className="floating-card conversation-card animate-fade-in animation-delay-600 group cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-foreground text-sm">Continue Recent Conversation</h3>
              <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-foreground-secondary mb-3 line-clamp-2">
              "I'm having issues with my AC unit not cooling properly and making strange noises..."
            </p>
            <div className="flex items-center justify-between text-xs text-foreground-muted">
              <span className="font-medium">with April</span>
              <span>2 hours ago</span>
            </div>
          </div>

          {/* Live Call Card - Floating */}
          <div className="floating-card conversation-card animate-fade-in animation-delay-800 group cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm mb-1">Start a Live Call</h3>
                <p className="text-xs text-foreground-secondary">
                  Speak directly with our technicians
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