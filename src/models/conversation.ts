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
    required: true
  },
  memberIds: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: Schema.Types.Number,
    required: true,
  },
})

const Conversation = mongoose.model<IConversation>(
  "conversations",
  ConversationSchema
)

export { Conversation }
