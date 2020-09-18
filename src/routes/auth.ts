import express from "express"
import jwt from "jsonwebtoken"
import _ from "lodash"
import passport from "passport"
import jwtSecret from "../config/jwtConfig"
import { Identity } from "../models/identity"
import { registerUser } from "../services/auth"
import { IRegisterUserInput } from "../types/user/IRegisterUserInput"
var router = express.Router()

router.post("/register", async (req, res, next) => {
  const payload: IRegisterUserInput = _.pick(req.body, [
    "firstName",
    "lastName",
    "userName",
    "password",
  ])
  console.log(payload)
  try {
    var user = await registerUser(payload)
    res.send(user)
  } catch (error) {
    res.status(400).send(JSON.stringify(error))
  }
})

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", (err, users, info) => {
    if (err) {
      console.error(`error ${err}`)
    }
    if (info !== undefined) {
      console.error(info.message)
      if (info.message === "bad username") {
        res.status(401).send(info.message)
      } else {
        res.status(403).send(info.message)
      }
    } else {
      req.logIn(users, () => {
        Identity.findOne({
          username: req.body.username,
        }).then((user: any) => {
          const token = jwt.sign(
            { id: user.id, username: user.username },
            jwtSecret.secret,
            {
              expiresIn: 60,
            }
          )
          res.status(200).send({
            auth: true,
            token,
            message: "user found & logged in",
          })
        })
      })
    }
  })(req, res, next)
})

export default router
