import mongoose, { Document, Schema } from "mongoose"

export interface IUser extends Document {
  id: string;
  email: string
  firstName: string
  lastName: string
}

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
  },
})

var User = mongoose.model<IUser>("users", UserSchema)

export { User }
