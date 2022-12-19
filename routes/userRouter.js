const express = require("express")
const userRouter = express.Router()
const User = require("../models/user.js")

userRouter.get("/", (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.send(users)
  })
})

module.exports = userRouter
