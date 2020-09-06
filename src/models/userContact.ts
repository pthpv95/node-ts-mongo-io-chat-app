import mongoose, {Schema} from "mongoose"

var UserContactSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  contacts: {
    type: [Schema.Types.ObjectId],
    required: true,
  }
})

var UserContact = mongoose.model("user_contacts", UserContactSchema)

export { UserContact }
