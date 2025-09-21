interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Conversation {
  id: string;
  messages: Message[];
  lastMessageTime: Date;
  preview: string;
}

const STORAGE_KEY = 'aircare_conversations';

export const conversationStorage = {
  saveConversation: (messages: Message[]): void => {
    if (messages.length === 0) return;
    
    const conversations = conversationStorage.getAllConversations();
    const conversationId = Date.now().toString();
    
    // Get preview from the first user message
    const firstUserMessage = messages.find(m => m.isUser);
    const preview = firstUserMessage?.text.slice(0, 100) || 'New conversation';
    
    const conversation: Conversation = {
      id: conversationId,
      messages: messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })),
      lastMessageTime: new Date(),
      preview
    };
    
    // Keep only the 5 most recent conversations
    const updatedConversations = [conversation, ...conversations.slice(0, 4)];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConversations));
  },

  getAllConversations: (): Conversation[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const conversations = JSON.parse(stored);
      return conversations.map((conv: any) => ({
        ...conv,
        lastMessageTime: new Date(conv.lastMessageTime),
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
    } catch (error) {
      console.error('Error loading conversations:', error);
      return [];
    }
  },

  getMostRecentConversation: (): Conversation | null => {
    const conversations = conversationStorage.getAllConversations();
    return conversations.length > 0 ? conversations[0] : null;
  },

  clearAllConversations: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
