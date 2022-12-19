const express = require("express")
const issueRouter = express.Router()
const Issue = require("../models/issue.js")

// Get All Issues
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})
// Get Issues by user id ***only works when user bearer token matches and does not need a separate ID since it's getting auth credentials by req.auth._id***
issueRouter.get("/user", (req, res, next) => {
  Issue.find({ user: req.auth._id }, (err, issues) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})
//Get Issue by ID
issueRouter.get("/:issueId", (req, res, next) => {
  Issue.find({ _id: req.params.issueId, user: req.auth._id }, (err, issues) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})
// Add New Issue
issueRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})
// Delete Issue by ID
issueRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId, user: req.auth._id },
    (err, deletedIssue) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res
        .status(200)
        .send(`Successfully deleted issue ${deletedIssue.title}`)
    }
  )
})
// Update Issue
issueRouter.put("/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedIssue)
    }
  )
})
// upvote
// issueRouter.put("/upvote/:issueId", (req, res, next) => {
//   console.log(typeof req.auth._id)
//   Issue.findById(
//     req.params.issueId,
//     (err, updatedIssue) => {
//       if(err) {
//         res.status(500)
//         return next(err)
//       }
//       if(!updatedIssue) {
//         res.send("no issue found")
//         return next(err)
//       }
//       const hasUpvoted = updatedIssue.upvotes.includes(req.auth._id)
//       const hasDownvoted = updatedIssue.downvotes.includes(req.auth._id)
//       if(hasUpvoted || hasDownvoted) {
//         return res.status(200).send({errMsg: `The user has already upvoted`, newUpvote: false})
//       } else {
//         Issue.findByIdAndUpdate(req.params.issueId, { $push: { upvotes: req.auth._id }}, {new: true},
//         (err, updatedIssue) => {
//         if(err) {
//           res.status(500)
//           return next(err)
//         }
//         res.status(201).send({updatedIssue, newUpvote: true})
//       }
//     )}
//   })
// })

// downvote
// issueRouter.put("/downvote/:issueId", (req, res, next) => {
//   console.log(typeof req.auth._id)
//   Issue.findById(
//     req.params.issueId,
//     (err, updatedIssue) => {
//       if(err) {
//         res.status(500)
//         return next(err)
//       }
//       if(!updatedIssue) {
//         res.send("no issue found")
//         return next(err)
//       }
//       const hasDownvoted = updatedIssue.downvotes.includes(req.auth._id)
//       const hasUpvoted = updatedIssue.upvotes.includes(req.auth._id)
//       if(hasDownvoted || hasUpvoted) {
//         return res.status(200).send({errMsg: `The user has already downvoted`, newDownvote: false})
//       } else {
//         Issue.findByIdAndUpdate(req.params.issueId, { $push: { downvotes: req.auth._id }}, {new: true},
//       (err, updatedIssue) => {
//         if(err) {
//           res.status(500)
//           return next(err)
//         }
//         res.status(201).send({updatedIssue, newDownvote: true})
//       }
//     )}
//   })
// })

//Upvote

issueRouter.put("/upvote/:issueId", (req, res, next) => {
  Issue.findByIdAndUpdate(
    { _id: req.params.issueId, user: req.auth._id },
    {
      $addToSet: { upvotes: req.auth._id },
      $pull: { downvotes: req.auth._id },
    },
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedIssue)
    }
  )
})
//downvotes
issueRouter.put("/downvote/:issueId", (req, res, next) => {
  Issue.findByIdAndUpdate(
    { _id: req.params.issueId, user: req.auth._id },
    {
      $addToSet: { downvotes: req.auth._id },
      $pull: { upvotes: req.auth._id },
    },
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedIssue)
    }
  )
})

module.exports = issueRouter
