import express from "express";
import { getUser, getUserContacts } from "../services/user";
var router = express.Router()

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId
  var user = await getUser(userId) || []
  res.send(user)
})

router.get("/:userId/contacts", async (req, res) => {
  const userId = req.params.userId
  var contacts = (await getUserContacts(userId)) || []
  res.send(contacts)
})

export default router
