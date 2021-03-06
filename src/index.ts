import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import passport from "passport"
import "./config/passport"
import "./db/mongoose"
import { User } from "./models/user"
import auth from "./routes/auth"
import messages from "./routes/message"
import users from "./routes/user"
import { app, server } from "./services/socket"

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())

app.use("/api/auth", auth)
app.use("/api/messages", passport.authenticate("jwt", { session: false }), messages)
app.use("/api/users", passport.authenticate("jwt", { session: false }), users)
const port = process.env.PORT || 3000
app.get("/", async (req: express.Request, res: express.Response) => {
  var users = await User.findOne()
  res.send(users)
})

server.listen(port, () => {
  console.log(`Chat app listening at http://localhost:${port}`)
})
