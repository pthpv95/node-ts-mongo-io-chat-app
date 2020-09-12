import mongoose, { Schema, Document } from "mongoose"

interface IReadReceipt extends Document {
  conversationId: string
  messageId: string
  seenBy: string
}

const ReadReceiptSchema = new Schema({
  conversationId: {
    type: String,
    required: true,
  },
  messageId: {
    type: String,
    required: true,
  },
  seenBy: {
    type: String,
  },
})

const ReadReceipt = mongoose.model<IReadReceipt>("read_receipt", ReadReceiptSchema)

export { ReadReceipt }
