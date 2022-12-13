import React, { useContext } from "react"
import { UserContext } from "../context/UserProvider.js"

const Comment = (props) => {
  const {
    user: { username },
  } = useContext(UserContext)
  const { comment } = props

  return (
    <div className='mb-1'>
      <p> {comment} </p>
      <p className='pb-2'>Comment By: {username}</p>
    </div>
  )
}

export default Comment
