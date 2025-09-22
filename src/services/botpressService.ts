// Declare botpressWebChat on window object for v3.3
declare global {
  interface Window {
    botpressWebChat: {
      init: (config: any) => void;
      sendEvent: (event: any) => Promise<any>;
      onEvent: (callback: (event: any) => void, options?: any) => void;
      onReady: (callback: () => void) => void;
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
  private isReady: boolean = false

  constructor() {
    this.initializeWebchat();
    this.setupMessageListener();
  }

  private async initializeWebchat() {
    // Wait for botpressWebChat to be available
    while (!window.botpressWebChat) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Initialize Botpress (keep existing config)
    window.botpressWebChat.init({
      // your existing config
      hideWidget: true,
      disableAnimations: true,
      showConversationsButton: false,
      showTimestamp: false,
      enableReset: false,
      enableTranscriptDownload: false,
      showPoweredBy: false,
      enableFileUpload: false,
      enableEmojiPicker: false,
      enableVoiceComposer: false,
      enablePersistHistory: false,
      enableArrowNavigation: false,
      enableConversationDeletion: false,
      stylesheet: 'data:text/css;base64,KiB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfQ=='
    });

    // Open the hidden chat session immediately
    window.botpressWebChat.onReady(() => {
      console.log('Botpress is ready');
      this.isReady = true;
      window.botpressWebChat.sendEvent({ type: 'show' });
      
      // Force hide the widget even after initialization
      if (typeof window.botpressWebChat.hide === 'function') {
        setTimeout(() => window.botpressWebChat.hide(), 100);
        setTimeout(() => window.botpressWebChat.hide(), 500);
        setTimeout(() => window.botpressWebChat.hide(), 1000);
      }
    });
    
    this.isInitialized = true;
  }

  private setupMessageListener() {
    // Listen for messages from Botpress
    window.addEventListener('message', (event) => {
      if (event.data.type === 'MESSAGE' && event.data.from === 'bot') {
        // Display bot message in your custom UI
        this.displayBotMessage(event.data.text);
      }
    });
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
    while (!this.isInitialized || !this.isReady) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Send user messages
  async sendMessage(userText: string): Promise<string> {
    await this.ensureInitialized();
    
    if (!this.conversationId) {
      await this.startConversation();
    }
    
    console.log('Sending message to Botpress:', userText);
    
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
      
      // Send the message using the new approach
      window.botpressWebChat.sendEvent({ 
        type: 'MESSAGE', 
        text: userText 
      }).catch((error) => {
        console.error('Error sending message:', error);
        if (!responseReceived) {
          responseReceived = true;
          this.messageHandlers = this.messageHandlers.filter(h => h !== handleResponse);
          resolve("I received your message! How can I help you with your HVAC system?");
        }
      });
      
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