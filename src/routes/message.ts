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

router.post("/:conversationId/create", async (req, res) => {
  const body: any = _.pick(req.body, [
    "text",
    "attachmentUrl",
    "type",
    "createdBy",
  ])

  const conversationId = req.params.conversationId
  const message = await createMessage({ ...body, conversationId })
  res.send(message)
})

router.post("/:conversationId/messages", async (req, res) => {
  try {
    const cursor: any = req.body.cursor
    const limit = req.body.limit
    const userId = "5f54ca16f39719fbf6a5cb43"

    console.log(cursor, limit);
    const data = await getConversationInfo(
      userId,
      req.params.conversationId,
      cursor,
      limit
    )
    res.send(data)
  } catch (error) {
    res.status(400).send(error)
  }
})

export default router
