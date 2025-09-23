// Updated Botpress Service for programmatic webchat control
declare global {
  interface Window {
    botpressWebChat: {
      init: (config: {
        botId: string;
        hostUrl: string;
        messagingUrl: string;
        clientId: string;
        hideWidget: boolean;
      }) => void;
      sendEvent: (event: { type: string; text: string }) => void;
      onEvent: (callback: (event: any) => void, types: string[]) => void;
    };
    sendMessageToBotpress: (text: string) => void;
    displayBotMessage: (text: string) => void;
    botpressMessageHandler: (text: string) => void;
  }
}

class BotpressService {
  private conversationId: string | null = null
  private isInitialized: boolean = false
  private messageHandlers: Array<(message: string) => void> = []
  private isReady: boolean = false

  constructor() {
    this.setupMessageHandler();
    this.waitForInitialization();
  }

  private setupMessageHandler() {
    // Set up the global message handler that will be called from index.html
    window.botpressMessageHandler = (messageText: string) => {
      console.log('Received message from Botpress via global handler:', messageText);
      this.displayBotMessage(messageText);
    };
  }

  private async waitForInitialization() {
    // Wait for BotpressWebChat API and global functions to be available
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds total
    
    while ((!window.botpressWebChat || !window.sendMessageToBotpress || !window.displayBotMessage) && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    if (attempts >= maxAttempts) {
      console.error('Botpress WebChat API not available after timeout');
      return;
    }
    
    console.log('Botpress WebChat service ready');
    this.isReady = true;
  }

  private displayBotMessage(text: string) {
    // Trigger all registered message handlers
    this.messageHandlers.forEach(handler => handler(text));
  }

  async startConversation() {
    await this.ensureInitialized();
    
    // Generate a new conversation ID
    this.conversationId = Date.now().toString();
    
    return { id: this.conversationId };
  }

  private async ensureInitialized() {
    while (!this.isReady) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Send user messages using the BotpressWebChat API
  async sendMessage(userText: string): Promise<string> {
    await this.ensureInitialized();
    
    // Double-check that the API is available
    if (!window.botpressWebChat || !window.sendMessageToBotpress) {
      console.error('BotpressWebChat API is not available');
      return "I'm having trouble connecting right now. Please try again in a moment.";
    }
    
    if (!this.conversationId) {
      await this.startConversation();
    }
    
    console.log('Sending message via BotpressWebChat API:', userText);
    
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
      
      try {
        // Use the global function which calls botpressWebChat.sendEvent()
        window.sendMessageToBotpress(userText);
      } catch (error) {
        console.error('Error sending message:', error);
        if (!responseReceived) {
          responseReceived = true;
          this.messageHandlers = this.messageHandlers.filter(h => h !== handleResponse);
          resolve("Hi! I'm April, your AirCare virtual assistant. I'm here to help with your HVAC questions, book diagnostics, and provide support. How can I assist you today?");
        }
      }
      
      // Set a timeout to avoid hanging
      setTimeout(() => {
        if (!responseReceived) {
          responseReceived = true;
          this.messageHandlers = this.messageHandlers.filter(h => h !== handleResponse);
          resolve("I'm here to help with your HVAC needs! Please let me know what you'd like assistance with.");
        }
      }, 10000);
    });
  }

  async getMessages() {
    // With BotpressWebChat API, we don't retrieve messages - they're handled through events
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