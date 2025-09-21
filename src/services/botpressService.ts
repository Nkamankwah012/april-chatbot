import { Client } from '@botpress/client'

const BOTPRESS_BOT_ID = '4bc55b81-20c1-4907-95e8-b4eb5cc763ab'

class BotpressService {
  private client: Client
  private conversationId: string | null = null

  constructor() {
    this.client = new Client({
      botId: BOTPRESS_BOT_ID
    })
  }

  async startConversation() {
    const { conversation } = await this.client.createConversation({
      channel: 'web',
      tags: {}
    })
    this.conversationId = conversation.id
    return conversation
  }

  async sendMessage(text: string) {
    if (!this.conversationId) {
      await this.startConversation()
    }
    
    const response = await this.client.createMessage({
      conversationId: this.conversationId!,
      userId: 'user',
      type: 'text',
      payload: { 
        text 
      },
      tags: {}
    })
    
    return response
  }

  async getMessages() {
    if (!this.conversationId) return { messages: [] }
    
    const messages = await this.client.listMessages({
      conversationId: this.conversationId
    })
    
    return messages
  }

  setConversationId(id: string) {
    this.conversationId = id
  }

  getConversationId() {
    return this.conversationId
  }
}

export const botpressService = new BotpressService()