const express = require("express")
const commentRouter = express.Router()
const Comment = require('../models/comment.js')

//Get All Comments
commentRouter.get("/", (req, res, next) => {
  Comment.find((err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})
//Get Comment by Issue Id
commentRouter.get("/:issueId", (req, res, next) => {
  Comment.find({issue: req.params.issueId },
  (err, comments) => {
    if (err) {
        res.status(500)
        return next(err)
    }
    return res.send(comments)
  })
})
//Get Comments by User Id ***Not working in postman***
commentRouter.get("/user", (req, res, next) => {
  Comment.find({ user: req.auth._id }, (err, comments) => {
    if(err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})
//Post a New Comment
commentRouter.post("/:issueId", (req, res, next) => {
  req.body.user = req.auth._id
  let issueId = req.params.issueId
  req.body.issue = issueId
  const newComment = new Comment(req.body)
  newComment.save((err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
})
//Delete a Comment (must be the user who created the comment)
commentRouter.delete("/:commentId", (req, res, next) => {
  Comment.findOneAndDelete(
    { _id: req.params.commentId, user: req.auth._id },
    (err, deletedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted comment: ${deletedComment.comment}`)
    })
})
//Update a Comment
commentRouter.put("/:commentId", (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.commentId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedComment)
    })
})

module.exports = commentRouter