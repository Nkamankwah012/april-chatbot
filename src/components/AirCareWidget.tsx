import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, MessageCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { HomeTab } from "./tabs/HomeTab";
import { ChatTab } from "./tabs/ChatTab";
import { FAQTab } from "./tabs/FAQTab";

export type TabType = "home" | "chat" | "faq";

interface Tab {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: Tab[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "chat", label: "Chats", icon: MessageCircle },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

export const AirCareWidget = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab onStartChat={() => setActiveTab("chat")} />;
      case "chat":
        return <ChatTab />;
      case "faq":
        return <FAQTab />;
      default:
        return <HomeTab onStartChat={() => setActiveTab("chat")} />;
    }
  };

  return (
    <div className="widget-container w-full max-w-md mx-auto h-[600px] flex flex-col">
      {/* Header */}
      <div className="widget-header">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">AC</span>
          </div>
          <span className="text-lg font-semibold">AirCare</span>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border/30 bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm">
        <nav className="flex justify-around items-center py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105" 
                    : "text-foreground-muted hover:text-primary hover:bg-primary/10 hover:scale-105"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};