interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ConversationData {
  sessionId: string;
  messages: Message[];
  lastUpdated: Date;
  preview: string; // First few words of the last user message
}

const STORAGE_KEY = 'aircare_user_conversation';

export const conversationStorage = {
  // Get the current user's conversation data
  getUserConversation(): ConversationData | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      
      const data = JSON.parse(stored);
      // Convert date strings back to Date objects
      data.lastUpdated = new Date(data.lastUpdated);
      data.messages = data.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      
      return data;
    } catch (error) {
      console.error('Error reading conversation from storage:', error);
      return null;
    }
  },

  // Save the current user's conversation data
  saveUserConversation(sessionId: string, messages: Message[]): void {
    try {
      if (messages.length === 0) return;
      
      // Get the last user message for preview
      const lastUserMessage = messages
        .filter(msg => msg.isUser)
        .pop();
      
      const preview = lastUserMessage 
        ? lastUserMessage.text.substring(0, 80) + (lastUserMessage.text.length > 80 ? '...' : '')
        : 'New conversation';

      const conversationData: ConversationData = {
        sessionId,
        messages,
        lastUpdated: new Date(),
        preview
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationData));
    } catch (error) {
      console.error('Error saving conversation to storage:', error);
    }
  },

  // Clear the current user's conversation
  clearUserConversation(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing conversation from storage:', error);
    }
  },

  // Check if user has a recent conversation (within last 24 hours)
  hasRecentConversation(): boolean {
    const conversation = this.getUserConversation();
    if (!conversation) return false;
    
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    return conversation.lastUpdated > twentyFourHoursAgo && conversation.messages.length > 0;
  },

  // Get time ago string for display
  getTimeAgo(): string {
    const conversation = this.getUserConversation();
    if (!conversation) return '';
    
    const now = new Date();
    const diff = now.getTime() - conversation.lastUpdated.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours >= 1) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes >= 1) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  }
};