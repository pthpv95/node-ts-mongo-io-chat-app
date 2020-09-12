import { Conversation } from "../models/conversation"
import { IMessage, Message } from "../models/message"
import _ from 'lodash'

class ConversationDTO {
  constructor(id: string, title: string, messages: MessageDTO[] = [], nextCursor: string) {
    this.id = id
    this.title = title
    this.messages = messages
    this.nextCursor = nextCursor
  }

  id: string
  title: string
  nextCursor: string;
  messages: MessageDTO[]
}

class MessageDTO {
  constructor(
    id: string,
    text: string,
    attachmentUrl: string,
    messageType: number,
    createdBy: string,
    createdAt: Date,
    isReponse: boolean
  ) {
    this.id = id
    this.text = text
    this.attachmentUrl = attachmentUrl
    this.messageType = messageType
    this.createdBy = createdBy
    this.createdAt = createdAt
    this.isReponse = isReponse
  }

  id: string
  text: IMessage["text"]
  attachmentUrl: IMessage["attachmentUrl"]
  messageType: IMessage["type"]
  createdBy: IMessage["createdBy"]
  createdAt: IMessage["createdAt"]
  isReponse: boolean
}

export interface CreateMessageInput {
  text: string
  attachmentUrl: string
  type: number
  createdBy: string
  conversationId: string
}

const getConversationInfo = async (
  userId: string,
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

    let nextCursor: any = null
    if (messages) {
      if (messages.length >= limit) {
        nextCursor = _.last(messages)?.id
      }

      const messagesDTO = messages.map((message) => {
        return new MessageDTO(
          message.id,
          message.text,
          message.attachmentUrl,
          message.type,
          message.createdBy,
          message.createdAt,
          message.createdBy !== userId
        )
      })
      return new ConversationDTO(
        conversation.id,
        conversation.title,
        _.orderBy(messagesDTO, mes => mes.createdAt),
        nextCursor
      )
    }

    return new ConversationDTO(conversation.id, conversation.title, [], nextCursor)
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
