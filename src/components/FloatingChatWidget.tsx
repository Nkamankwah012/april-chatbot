import { useState } from "react";
import { Phone, MessageCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AirCareWidget } from "./AirCareWidget";

export const FloatingChatWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCall = () => {
    window.open('tel:+14084432613', '_self');
  };

  const handleChat = () => {
    setIsExpanded(true);
  };

  const handleFAQ = () => {
    window.open('https://april-chatbot.lovable.app/faq', '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ height: "60px", width: "300px" }}
            animate={{ height: "700px", width: "400px" }}
            exit={{ height: "60px", width: "300px" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-[hsl(var(--widget-glass))] backdrop-blur-sm border border-border/50 rounded-2xl shadow-[var(--shadow-medium)] overflow-hidden"
          >
            {/* Close button in top right of expanded widget */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-lg"
            >
              ×
            </button>
            
            {/* Full widget content */}
            <div className="h-full">
              <AirCareWidget />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ height: "700px", width: "400px" }}
            animate={{ height: "60px", width: "300px" }}
            exit={{ height: "700px", width: "400px" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl shadow-[var(--shadow-medium)] overflow-hidden"
          >
            {/* Navigation Bar */}
            <div className="h-full flex items-center justify-around px-4">
              <button
                onClick={handleCall}
                className="flex flex-col items-center text-white hover:text-white/80 transition-colors py-2 px-3"
              >
                <Phone className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">Call</span>
              </button>
              
              <button
                onClick={handleChat}
                className="flex flex-col items-center text-white hover:text-white/80 transition-colors py-2 px-3"
              >
                <MessageCircle className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">Chat</span>
              </button>
              
              <button
                onClick={handleFAQ}
                className="flex flex-col items-center text-white hover:text-white/80 transition-colors py-2 px-3"
              >
                <HelpCircle className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">FAQ</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};