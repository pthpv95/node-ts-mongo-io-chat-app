import express from "express"
var router = express.Router()
import { Message } from "../models/message"
import {
  getConversationInfo,
  createMessage,
  CreateMessageInput,
} from "../services/message"
import _ from "lodash"

router.get("/", async (req, res) => {
  const messages = await Message.find()
  res.send(messages)
})

router.post("/:conversationId", async (req, res) => {
  var body: CreateMessageInput = _.pick(req.body, [
    "text",
    "attachmentUrl",
    "type",
    "createdBy",
  ])

  var conversationId = req.params.conversationId
  var message = await createMessage({ ...body, conversationId })
  res.send(message)
})

router.get("/:conversationId", async (req, res) => {
  try {
    const cursor: any = req.body.cursor
    const data = await getConversationInfo(req.params.conversationId, cursor)
    res.send(data)
  } catch (error) {
    res.status(400).send(error)
  }
})

export default router
