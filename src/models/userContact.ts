import mongoose, {Schema} from "mongoose"

var UserContactSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  contacts: {
    type: [Schema.Types.Array],
    required: true,
  }
})

var UserContact = mongoose.model("user_contacts", UserContactSchema)

export { UserContact }
