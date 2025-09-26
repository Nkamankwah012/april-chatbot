import { useState } from "react";
import { Phone, MessageCircle, HelpCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AirCareWidget } from "./AirCareWidget";
import aprilAvatar from "@/assets/april-avatar-new.jpg";

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
            initial={{ scale: 0, opacity: 0, originX: 1, originY: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, originX: 1, originY: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[360px] flex flex-col"
          >
            {/* Main Widget */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 mb-2">
              {/* Close Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
              
              {/* Chat Content */}
              <div className="h-[600px]">
                <AirCareWidget />
              </div>
            </div>
            
            {/* Bottom Navigation Bar */}
            <div className="bg-orange-400 rounded-xl p-3 shadow-xl">
              <div className="flex justify-around items-center">
                <button
                  onClick={handleCall}
                  className="flex flex-col items-center text-white hover:text-orange-100 transition-colors px-4 py-2"
                >
                  <Phone className="w-6 h-6 mb-1" />
                  <span className="text-sm font-medium">Call</span>
                </button>
                
                <button
                  onClick={handleChat}
                  className="flex flex-col items-center text-white hover:text-orange-100 transition-colors px-4 py-2"
                >
                  <MessageCircle className="w-6 h-6 mb-1" />
                  <span className="text-sm font-medium">Chat</span>
                </button>
                
                <button
                  onClick={handleFAQ}
                  className="flex flex-col items-center text-white hover:text-orange-100 transition-colors px-4 py-2"
                >
                  <HelpCircle className="w-6 h-6 mb-1" />
                  <span className="text-sm font-medium">FAQ</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="minimized"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={handleChat}
            className="w-[60px] h-[60px] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 overflow-hidden border-4 border-white"
            style={{
              backgroundImage: `url(${aprilAvatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open chat with April"
          >
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};