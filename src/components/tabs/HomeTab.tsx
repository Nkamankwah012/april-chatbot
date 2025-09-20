import { ArrowRight, Phone, MessageSquare, Calendar, FileText } from "lucide-react";
import aircareLogoImg from "@/assets/aircare-logo.jpeg";

interface HomeTabProps {
  onStartChat: () => void;
}

export const HomeTab = ({ onStartChat }: HomeTabProps) => {
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Wave Header Background */}
      <div className="wave-header relative">
        {/* Logo and Greeting */}
        <div className="relative z-10 pt-6 pb-12 px-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center p-1 shadow-lg">
              <img 
                src={aircareLogoImg} 
                alt="AirCare Logo" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>
          <div className="text-left space-y-2">
            <h1 className="text-2xl font-bold text-white drop-shadow-md">
              Hi, there!
            </h1>
            <p className="text-white/90 text-base drop-shadow-sm">
              How can we help you today??
            </p>
          </div>
        </div>
        
        {/* Wave Shape */}
        <div className="wave-shape"></div>
      </div>

      {/* Content Area with Watermark Background */}
      <div className="flex-1 relative bg-gradient-to-b from-background via-background to-muted/30">
        {/* Watermark Background */}
        <div className="watermark-background"></div>
        
        {/* Floating Content */}
        <div className="relative z-10 px-6 py-6 space-y-6">
          {/* Primary Action - Floating */}
          <div className="floating-card animate-fade-in animation-delay-200">
            <button
              onClick={onStartChat}
              className="gradient-button w-full flex items-center justify-center space-x-3 text-lg py-4 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="font-semibold">Ask a Question</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Secondary Actions - Floating Side by Side */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in animation-delay-400">
            <button className="floating-card secondary-button group">
              <Calendar className="w-7 h-7 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-foreground">Book Diagnostic</span>
            </button>
            <button className="floating-card secondary-button group">
              <FileText className="w-7 h-7 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-foreground">Request Estimate</span>
            </button>
          </div>

          {/* Continue Conversation Card - Floating */}
          <div className="floating-card conversation-card animate-fade-in animation-delay-600 group cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-foreground text-base">Continue Recent Conversation</h3>
              <ArrowRight className="w-5 h-5 text-foreground-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-sm text-foreground-secondary mb-3 line-clamp-2">
              "I'm having issues with my AC unit not cooling properly and making strange noises..."
            </p>
            <div className="flex items-center justify-between text-xs text-foreground-muted">
              <span className="font-medium">with April</span>
              <span>2 hours ago</span>
            </div>
          </div>

          {/* Live Call Card - Floating */}
          <div className="floating-card conversation-card animate-fade-in animation-delay-800 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-base mb-1">Start a Live Call</h3>
                <p className="text-sm text-foreground-secondary">
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