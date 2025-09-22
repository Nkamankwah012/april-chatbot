// Declare botpressWebChat on window object for v3.3
declare global {
  interface Window {
    botpressWebChat: {
      sendEvent: (event: any) => Promise<any>;
      onEvent: (callback: (event: any) => void, options?: any) => void;
      mergeConfig: (config: any) => void;
      show: () => void;
      hide: () => void;
    };
  }
}

class BotpressService {
  private conversationId: string | null = null
  private isInitialized: boolean = false
  private messageHandlers: Array<(message: string) => void> = []

  constructor() {
    this.initializeWebchat();
  }

  private async initializeWebchat() {
    // Wait for botpressWebChat to be available
    while (!window.botpressWebChat) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Ensure widget is hidden
    window.botpressWebChat.mergeConfig({
      hideWidget: true
    });
    
    // Listen for bot messages
    window.botpressWebChat.onEvent((event: any) => {
      if (event.type === 'message' && !event.user) {
        // This is a bot message
        const messageText = event.payload?.text || event.text || "I received your message!";
        this.messageHandlers.forEach(handler => handler(messageText));
      }
    });
    
    this.isInitialized = true;
  }

  async startConversation() {
    await this.ensureInitialized();
    
    // Generate a new conversation ID
    this.conversationId = Date.now().toString();
    
    return { id: this.conversationId };
  }

  private async ensureInitialized() {
    while (!this.isInitialized) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  async sendMessage(text: string): Promise<string> {
    await this.ensureInitialized();
    
    if (!this.conversationId) {
      await this.startConversation();
    }
    
    return new Promise((resolve, reject) => {
      let responseReceived = false;
      
      // Add temporary message handler for this specific message
      const handleResponse = (messageText: string) => {
        if (!responseReceived) {
          responseReceived = true;
          // Remove this handler
          this.messageHandlers = this.messageHandlers.filter(h => h !== handleResponse);
          resolve(messageText);
        }
      };
      
      this.messageHandlers.push(handleResponse);
      
      // Send the message using v3.3 API
      window.botpressWebChat.sendEvent({
        type: 'text',
        payload: {
          text: text
        }
      }).catch((error) => {
        if (!responseReceived) {
          responseReceived = true;
          this.messageHandlers = this.messageHandlers.filter(h => h !== handleResponse);
          resolve("I received your message!");
        }
      });
      
      // Set a timeout to avoid hanging
      setTimeout(() => {
        if (!responseReceived) {
          responseReceived = true;
          this.messageHandlers = this.messageHandlers.filter(h => h !== handleResponse);
          resolve("I received your message!");
        }
      }, 10000);
    });
  }

  async getMessages() {
    // With webchat SDK, we don't retrieve messages - they're handled through events
    return { messages: [] };
  }

  setConversationId(id: string) {
    this.conversationId = id
  }

  getConversationId() {
    return this.conversationId
  }
}

export const botpressService = new BotpressService()