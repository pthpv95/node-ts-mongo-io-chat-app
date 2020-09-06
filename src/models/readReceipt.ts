import mongoose, { Schema, Document } from "mongoose"

interface IReadReceipt extends Document {
  conversationId: string
  messageId: string
  seenBy: string
}

const readReceiptSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  messageId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  seenBy: {
    type: Schema.Types.ObjectId,
  },
})

const ReadReceipt = mongoose.model<IReadReceipt>(
  "readReceipt",
  readReceiptSchema
)

export { ReadReceipt }
