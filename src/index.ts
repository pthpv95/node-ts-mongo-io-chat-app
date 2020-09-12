import bodyParser from "body-parser"
import express from "express"
import "./db/mongoose"
import { User } from "./models/user"
import messages from "./routes/message"
import users from "./routes/user"
import { app, server } from "./services/socket"
import cors from "cors"

app.use(bodyParser.json())
app.use(cors())
app.use("/api/messages", messages)
app.use("/api/users", users)
const port = process.env.PORT || 3000
app.get("/", async (req: express.Request, res: express.Response) => {
  var users = await User.findOne()
  res.send(users)
})

server.listen(port, () => {
  console.log(`Chat app listening at http://localhost:${port}`)
})

