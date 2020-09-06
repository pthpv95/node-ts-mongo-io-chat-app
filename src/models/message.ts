import mongoose, { Schema, Document } from "mongoose"

interface IMessage extends Document {
  text: string
  attachmentUrl: string
  conversationId: string
  type: number
  createdBy: string
  created: Date;
}

const MessageSchema = new Schema({
  text: {
    type: String,
  },
  attachmentUrl: {
    type: String,
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
  },
  created: {
    type: Date,
    default: Date.now
  },
})

const Message = mongoose.model<IMessage>("messages", MessageSchema)

export { Message }
