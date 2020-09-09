import http from "http"
import socketIO from "socket.io"

const app: any = require("express")()
const server = http.createServer(app)
const io = socketIO(server)

io.on("connection", (socket) => {
  socket.emit("event", "hello world")
  
  socket.on("some-event", () => {
    socket.emit("event", 'hell world')
    console.log("User was disconnected!")
  })

  socket.on("disconnect", () => {
    console.log("User was disconnected!")
  })
})

export { app, server }
