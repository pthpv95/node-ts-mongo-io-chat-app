import express from "express"
var router = express.Router()
import { Message } from "../models/message"

router.get("/", async (req, res) => {
  const messages = await Message.find()
  res.send(messages)
})

router.get("/about", function (req, res) {
  res.send("About birds")
})

export default router;
