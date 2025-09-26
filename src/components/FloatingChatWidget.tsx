import { useState } from "react";
import { Phone, MessageCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AirCareWidget } from "./AirCareWidget";
import { cn } from "@/lib/utils";
import aprilAvatar from "@/assets/april-avatar-new.jpg";

export const FloatingChatWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCall = () => {
    window.open('tel:+14084432613', '_self');
  };

  const handleFAQ = () => {
    window.open('https://april-chatbot.lovable.app/faq', '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ scale: 0, opacity: 0, originX: 1, originY: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, originX: 1, originY: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[360px] h-[680px] bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-4 text-white text-center font-bold">
              April - AirCare Virtual Assistant
            </div>
            
            {/* Chat Content */}
            <div className="h-[calc(100%-120px)] overflow-y-auto">
              <AirCareWidget />
            </div>
            
            {/* Bottom Navigation */}
            <div className="flex justify-around bg-gray-50 p-3 border-t-2 border-gray-200">
              <button
                onClick={handleCall}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors font-medium"
              >
                <Phone className="w-4 h-4" />
                Call
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg transition-colors font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
              <button
                onClick={handleFAQ}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-lg transition-colors font-medium"
              >
                <HelpCircle className="w-4 h-4" />
                FAQ
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="minimized"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setIsExpanded(true)}
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