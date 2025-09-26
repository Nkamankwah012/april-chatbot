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
            initial={{ 
              scale: 0.2, 
              opacity: 0,
              x: 100,
              y: 300,
              originX: 1,
              originY: 1
            }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              x: 0,
              y: 0
            }}
            exit={{ 
              scale: 0.2, 
              opacity: 0,
              x: 100,
              y: 300
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.3 }
            }}
            className="w-[400px] h-[700px] bg-[hsl(var(--widget-glass))] backdrop-blur-sm border border-border/50 rounded-2xl shadow-[var(--shadow-medium)] overflow-hidden"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              onClick={() => setIsExpanded(false)}
              className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-lg"
            >
              ×
            </motion.button>
            
            {/* Full widget content */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="h-full"
            >
              <AirCareWidget />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ 
              scale: 1, 
              opacity: 1,
              x: 0,
              y: 0
            }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              x: 0,
              y: 0
            }}
            exit={{ 
              scale: 5, 
              opacity: 0,
              x: -100,
              y: -300
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="w-[300px] h-[60px] bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl shadow-[var(--shadow-medium)] overflow-hidden cursor-pointer"
          >
            {/* Navigation Bar */}
            <div className="h-full flex items-center justify-around px-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCall}
                className="flex flex-col items-center text-white hover:text-white/80 transition-colors py-2 px-3"
              >
                <Phone className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">Call</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleChat}
                className="flex flex-col items-center text-white hover:text-white/80 transition-colors py-2 px-3"
              >
                <MessageCircle className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">Chat</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFAQ}
                className="flex flex-col items-center text-white hover:text-white/80 transition-colors py-2 px-3"
              >
                <HelpCircle className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">FAQ</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};