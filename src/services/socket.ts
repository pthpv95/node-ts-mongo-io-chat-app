import http from "http"
import socketIO from "socket.io"
import { SocketEvents, SocketActions } from "../constants"
import { createMessage, CreateMessageInput } from "../services/message"

const app: any = require("express")()
const server = http.createServer(app)
const io = socketIO(server)

io.on("connection", (socket) => {
  socket.emit("event", "hello world")

  socket.on(SocketActions.send_message, async (data, cb) => {
    console.log(data)
    const userId = "5f54ca16f39719fbf6a5cb43"//data.userId

    const input: CreateMessageInput = {
      text: data.text,
      attachmentUrl: data.attachmentUrl,
      type: data.text ? 0 : 1,
      createdBy: userId, // TODO: get from claim later
      conversationId: data.conversationId,
    }

    const message = await createMessage(input)
    const response = {
      id: message._id,
      text: data.text,
      attachmentUrl: data.attachmentUrl,
      messageType: message.type,
      senderId: userId,
      seen: true,
      sentBy: userId,
      conversationId: data.conversationId,
    }
    socket.emit(SocketEvents.new_message, response)
    cb()
  })

  socket.on(SocketEvents.read_message, (data) => {
    socket.emit(SocketEvents.message_seen, "hello world")
  })

  socket.on(SocketActions.typing_message, (data) => {
    socket.emit(SocketEvents.typing, data)
  })

  socket.on(SocketActions.stop_typing_message, (data) => {
    socket.emit(SocketEvents.stop_typing, data)
  })

  socket.on("disconnect", () => {
    console.log("User was disconnected!")
  })
})

export { app, server }
