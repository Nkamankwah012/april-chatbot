import { useState } from "react";
import { Phone, MessageCircle, HelpCircle, Mail, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AirCareWidget } from "./AirCareWidget";
import { cn } from "@/lib/utils";
import aprilAvatar from "@/assets/april-avatar-new.jpg";

export const FloatingChatWidget = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCall = () => {
    window.open('tel:+14084432613', '_self');
  };

  const handleEmail = () => {
    window.open('mailto:info@aircareservices.com', '_self');
  };

  const handleText = () => {
    window.open('sms:+14084432613', '_self');
  };

  const handleChat = () => {
    setIsExpanded(true);
    setShowWelcome(false);
  };

  const handleFAQ = () => {
    window.open('https://april-chatbot.lovable.app/faq', '_blank');
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Welcome Banner */}
      <AnimatePresence>
        {showWelcome && !isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-4 left-4 right-4 pointer-events-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl border-4 border-orange-400 p-4 mx-auto max-w-sm relative">
              <button
                onClick={() => setShowWelcome(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Welcome to AirCare HVAC</h3>
              <p className="text-gray-600 text-sm">I'm here if you have any questions or need help!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-auto">
        <div className="bg-orange-400 p-4">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <button
              onClick={handleText}
              className="flex flex-col items-center text-white hover:text-orange-100 transition-colors"
            >
              <MessageSquare className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">Text</span>
            </button>
            
            <button
              onClick={handleCall}
              className="flex flex-col items-center text-white hover:text-orange-100 transition-colors"
            >
              <Phone className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">Call</span>
            </button>
            
            <button
              onClick={handleEmail}
              className="flex flex-col items-center text-white hover:text-orange-100 transition-colors"
            >
              <Mail className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">Email</span>
            </button>
            
            <button
              onClick={handleChat}
              className="flex flex-col items-center text-white hover:text-orange-100 transition-colors"
            >
              <MessageCircle className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Chat Widget */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-20 right-4 w-[360px] h-[600px] pointer-events-auto"
          >
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 h-full">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-white flex justify-between items-center">
                <div className="font-bold">April - AirCare Assistant</div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Chat Content */}
              <div className="h-[calc(100%-60px)]">
                <AirCareWidget />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};