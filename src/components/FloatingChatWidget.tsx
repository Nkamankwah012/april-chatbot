import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AirCareWidget } from "./AirCareWidget";
import { cn } from "@/lib/utils";

export const FloatingChatWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleWidget = () => setIsExpanded(!isExpanded);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Close button */}
            <button
              onClick={toggleWidget}
              className={cn(
                "absolute -top-2 -right-2 z-10",
                "w-8 h-8 rounded-full",
                "bg-destructive text-destructive-foreground",
                "hover:bg-destructive/90",
                "flex items-center justify-center",
                "shadow-lg border-2 border-background",
                "transition-colors duration-200"
              )}
              aria-label="Close chat widget"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Full widget */}
            <div className="shadow-2xl rounded-2xl overflow-hidden">
              <AirCareWidget />
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="minimized"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={toggleWidget}
            className={cn(
              "w-16 h-16 rounded-full",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90",
              "flex items-center justify-center",
              "shadow-2xl",
              "transition-all duration-300",
              "hover:scale-110 active:scale-95",
              "border-4 border-background"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open chat widget"
          >
            <MessageCircle className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};