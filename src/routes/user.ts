import express from "express"
var router = express.Router()
import { getUser } from "../services/user"

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId
  var user = await getUser(userId) || []
  res.send(user)
})

export default router
