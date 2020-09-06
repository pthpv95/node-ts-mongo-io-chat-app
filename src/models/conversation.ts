import mongoose, { Schema, Document } from "mongoose"

interface IConversation extends Document {
  title: string
  memberIds: string[]
  createdBy: string
  createdAt: Date
}

const ConversationSchema = new Schema({
  title: {
    type: String,
  },
  memberIds: {
    type: [Schema.Types.ObjectId],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Conversation = mongoose.model<IConversation>(
  "conversations",
  ConversationSchema
)

export { Conversation }
