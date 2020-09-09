import bodyParser from "body-parser"
import express from "express"
import "./db/mongoose"
import { User } from "./models/user"
import messages from "./routes/message"
import user from "./routes/user"
import { app, server } from "./services/socket"

app.use(bodyParser.json())
app.use("/api/messages", messages)
app.use("/api/users", user)
const port = process.env.PORT || 3000
app.get("/", async (req: express.Request, res: express.Response) => {
  var users = await User.findOne()
  console.log(users)
  res.send(users)
})

server.listen(port, () => {
  console.log(`Chat app listening at http://localhost:${port}`)
})

