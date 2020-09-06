import express from "express"
var router = express.Router()
import { User } from "../models/user"

router.get("/", async (req, res) => {
  var users = await User.findOne()
  res.send(users)
})

export default router
