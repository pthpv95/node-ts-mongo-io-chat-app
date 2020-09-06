import express from "express"
import bodyParser from "body-parser"
import "./db/mongoose"
import { ObjectId } from "mongodb"
import { User } from "./models/user"
import messages from "./routes/message"
import user from "./routes/user"
// const fs = require("fs")

// let messagesData: any = []
// for (let index = 0; index < 100; index++) {
//   const element: any = {
//     text: "message " + index,
//     attachmentUrl: "",
//     conversationId: new ObjectId(),
//     type: 0,
//     createdBy: new ObjectId(),
//     created: Date.now,
//   }
//   messagesData.push(element)
// }
// let data = JSON.stringify(messagesData)
// fs.writeFileSync("message.json", data)

const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

io.on("connection", (client: any) => {
  client.on("event", (data: any) => {})
  client.on("disconnect", () => {})
})

app.use(bodyParser.json())

app.use('/api/messages', messages)
app.use("/api/users", user)
const port = 3000

app.get("/", async (req: express.Request, res: express.Response) => {
  var users = await User.findOne()
  console.log(users)
  res.send(users)
})



app.listen(port, () => {
  console.log(`Chat app listening at http://localhost:${port}`)
})
