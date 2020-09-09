import { Conversation } from "../models/conversation"
import { IMessage, Message } from "../models/message"

class ConversationDTO {
  constructor(id: string, title: string, messages: MessageDTO[] = []) {
    this.id = id
    this.title = title
    this.messages = messages
  }

  id: string
  title: string
  messages: MessageDTO[]
}

class MessageDTO {
  constructor(
    id: string,
    text: string,
    attachmentUrl: string,
    type: number,
    createdBy: string,
    createdAt: Date
  ) {
    this.id = id
    this.text = text
    this.attachmentUrl = attachmentUrl
    this.type = type
    this.createdBy = createdBy
    this.createdAt = createdAt
  }

  id: string
  text: IMessage["text"]
  attachmentUrl: IMessage["attachmentUrl"]
  type: IMessage["type"]
  createdBy: IMessage["createdBy"]
  createdAt: IMessage["createdAt"]
}

export interface CreateMessageInput {
  id: string
  text: string
  attachmentUrl: string
  type: number
  createdBy: string
  conversationId: string
}

const getConversationInfo = async (
  conversationId: string,
  cursor?: number,
  limit: number = 3
) => {
  var conversation = await Conversation.findById(conversationId)
  if (conversation) {
    let predicate: any = {
      conversationId,
    }
    if (cursor) {
      predicate = {
        ...predicate,
        _id: { $lt: cursor },
      }
    }

    var messages = await Message.find({ ...predicate })
      .sort({ _id: -1 })
      .limit(limit)

    if (messages) {
      return new ConversationDTO(
        conversation.id,
        conversation.title,
        messages.map((message) => {
          return new MessageDTO(
            message.id,
            message.text,
            message.attachmentUrl,
            message.type,
            message.createdBy,
            message.createdAt
          )
        })
      )
    }

    return new ConversationDTO(conversation.id, conversation.title)
  }

  throw new Error("Conversation not found")
}

const getUserContacts = (id: string) => {}

const createMessage = async (input: CreateMessageInput): Promise<any> => {
  var message = new Message(input)
  await message.save()
  return message
}

var createConversation = async (
  title: string,
  createdBy: string,
  memberIds: string[]
) => {
  var conversation = new Conversation({
    title,
    createdBy,
    memberIds,
  })

  await conversation.save()
  return conversation
}

export { getConversationInfo, createMessage, createConversation }
