import React from "react"
import IssueCard from "./IssueCard.js"

const IssueList = (props) => {
  const { issues } = props

  return (
    // <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
    <div className='flex flex-col w-[380px] md:w-[600px]'>
      {issues.map((issue) => (
        <IssueCard {...issue} key={issue._id} />
      ))}
    </div>
  )
}

export default IssueList
