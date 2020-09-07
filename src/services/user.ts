import { User, IUser } from "../models/user"

class UserInfo {
  constructor(id: string, firstName: string, lastName: string, email: string){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
const getUser = async (id: string) => {
  var user = await User.findById(id)
  
  if(user){
    return new UserInfo(user.id, user.firstName, user.lastName, user.email)
  }

  return []
}

const getUserContacts = (id: string) => {
  
}

export {
  getUser
}