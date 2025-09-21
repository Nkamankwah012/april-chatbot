import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, MessageCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { HomeTab } from "./tabs/HomeTab";
import { ChatTab } from "./tabs/ChatTab";
import { FAQTab } from "./tabs/FAQTab";
import aircareLogoImg from "@/assets/aircare-logo.jpeg";
import { conversationStorage } from "@/lib/conversationStorage";

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
  const [initialChatMessage, setInitialChatMessage] = useState<string | undefined>();
  const [existingMessages, setExistingMessages] = useState<any[] | undefined>();

  const handleBookDiagnostic = () => {
    setInitialChatMessage("I'd like to book a diagnostic appointment.");
    setExistingMessages(undefined);
    setActiveTab("chat");
  };

  const handleRequestEstimate = () => {
    setInitialChatMessage("I'd like to request an estimate for a system replacement.");
    setExistingMessages(undefined);
    setActiveTab("chat");
  };

  const handleContinueConversation = () => {
    const recentConversation = conversationStorage.getMostRecentConversation();
    if (recentConversation) {
      setExistingMessages(recentConversation.messages);
      setInitialChatMessage(undefined);
      setActiveTab("chat");
    }
  };

  const handleStartNewChat = () => {
    setInitialChatMessage(undefined);
    setExistingMessages(undefined);
    setActiveTab("chat");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeTab 
            onStartChat={handleStartNewChat} 
            onBookDiagnostic={handleBookDiagnostic}
            onRequestEstimate={handleRequestEstimate}
            onContinueConversation={handleContinueConversation}
          />
        );
      case "chat":
        return (
          <ChatTab 
            initialMessage={initialChatMessage} 
            existingMessages={existingMessages}
            onBackToHome={() => setActiveTab("home")}
          />
        );
      case "faq":
        return <FAQTab />;
      default:
        return (
          <HomeTab 
            onStartChat={handleStartNewChat} 
            onBookDiagnostic={handleBookDiagnostic}
            onRequestEstimate={handleRequestEstimate}
            onContinueConversation={handleContinueConversation}
          />
        );
    }
  };

  return (
    <div className="widget-container w-full max-w-md mx-auto h-[750px] flex flex-col">
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
      <div className="border-t border-border/30 bg-white/50 backdrop-blur-sm">
        <nav className="flex justify-around items-center py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-300",
                  isActive ? "tab-active" : "tab-inactive"
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