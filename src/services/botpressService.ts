// Declare botpressWebChat on window object
declare global {
  interface Window {
    botpressWebChat: {
      init: (config: any) => void;
      sendEvent: (event: any) => void;
      onEvent: (callback: (event: any) => void, events?: string[]) => void;
      mergeConfig: (config: any) => void;
    };
  }
}

class BotpressService {
  private conversationId: string | null = null
  private isInitialized: boolean = false

  constructor() {
    this.initializeWebchat();
  }

  private async initializeWebchat() {
    // Wait for botpressWebChat to be available
    while (!window.botpressWebChat) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Listen for messages from the bot
    window.botpressWebChat.onEvent((event: any) => {
      if (event.type === 'messageSent' && event.userId !== 'user') {
        // Handle bot messages if needed
      }
    }, ['messageSent']);
    
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
      
      // Set up event listener for the bot's response
      const handleMessage = (event: any) => {
        if (event.type === 'messageSent' && event.userId !== 'user' && !responseReceived) {
          responseReceived = true;
          resolve(event.payload?.text || "I received your message!");
        }
      };
      
      window.botpressWebChat.onEvent(handleMessage, ['messageSent']);
      
      // Send the message
      window.botpressWebChat.sendEvent({
        type: 'messageSent',
        userId: 'user',
        payload: {
          type: 'text',
          text: text
        }
      });
      
      // Set a timeout to avoid hanging
      setTimeout(() => {
        if (!responseReceived) {
          responseReceived = true;
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