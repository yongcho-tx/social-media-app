const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const { expressjwt } = require("express-jwt")
require("dotenv").config()
const PORT = process.env.PORT || 8000
const path = require("path")

app.use(express.json())
app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, "client", "build")))

const API_KEY = process.env.API_KEY

mongoose.connect(process.env.MONGODB_URI, () =>
  console.log("Connected to the mongodb")
)

app.use("/auth", require("./routes/authRouter.js"))
app.use(
  "/api",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
)
app.use("/api/issue", require("./routes/issueRouter.js"))
app.use("/api/comment", require("./routes/commentRouter.js"))
app.use("/api/user", require("./routes/userRouter.js"))

app.use((err, req, res, next) => {
  console.log(err)
  if (err.name === "UnauthorizedError") {
    res.status(err.status)
  }
  return res.send({ errMsg: err.message })
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server is connected on ${PORT}`)
})
