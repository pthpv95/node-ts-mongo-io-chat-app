import { User, IUser } from "../models/user"
import { Contact, IContact } from "../models/contact"
import { ReadReceipt } from "../models/readReceipt"
import { Conversation } from "../models/conversation"
import { UserConversation } from "../models/userConversation"
import _ from "lodash"
import { asyncForEach } from "../helpers"

class UserInfo {
  constructor(id: string, firstName: string, lastName: string, email: string) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }
  id: string
  firstName: string
  lastName: string
  email: string
}

class ContactInfo extends UserInfo {
  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    conversationId: string
  ) {
    super(id, firstName, lastName, email)
    this.conversationId = conversationId
  }

  conversationId: string
}

const getUser = async (id: string) => {
  var user = await User.findById(id)

  if (user) {
    return new UserInfo(user.id, user.firstName, user.lastName, user.email)
  }

  return []
}

const getUserContacts = async (userId: string) => {
  var userContacts = await Contact.findOne({ userId })
  var contacts = await User.find({
    _id: { $in: userContacts?.contacts },
  })

  var contactsInfo: ContactInfo[] = []
  await asyncForEach(contacts, async (contact: IUser) => {
    const members = [contact.id, userId]
    var conversation = await Conversation.findOne({
      memberIds: { $in: members },
    })

    if (!conversation?.memberIds.some((m: string) => m === contact.id)) {
      return false
    }else{
      contactsInfo.push(
        new ContactInfo(
          contact.id,
          contact.firstName,
          contact.lastName,
          contact.email,
          conversation?._id
        )
      )
    }
  })

  return contactsInfo
}

export { getUser, getUserContacts }
