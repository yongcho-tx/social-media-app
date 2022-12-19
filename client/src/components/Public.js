import React, { useContext, useEffect } from "react"
import { UserContext } from "../context/UserProvider.js"
import IssueCard from "./IssueCard.js"

const style = {
  container: `flex flex-col items-center h-screen`,
  h1: `text-4xl text-center m-10`,
  h2: `text-center text-xl`,
  publicIssues: `flex flex-col w-[380px] md:w-[600px]`,
}

const Public = (props) => {
  const {
    getAllIssues,
    allIssues,
    deleteIssue,
    user: { username },

    issues,
  } = useContext(UserContext)

  const publicIssues = allIssues.map((issue) => (
    <IssueCard {...issue} key={issue._id} />
  ))
  const { downvotesCount, upvotesCount } = props

  useEffect(() => {
    console.log("use effect ran")
    getAllIssues()
  }, [downvotesCount + upvotesCount, issues, downvotesCount, upvotesCount])

  return (
    <div className={style.container}>
      <h1 className={style.h1}>All Users' Issues</h1>
      <h2 className={style.h2}>
        You are currently logged in as user: {username}
      </h2>
      <div className={style.publicIssues}>{publicIssues}</div>
    </div>
  )
}

export default Public
