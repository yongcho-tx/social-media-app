import React, { useContext } from "react"
import { UserContext } from "../context/UserProvider.js"

const Comment = (props) => {
  const {
    user: { username },
    usersList,
  } = useContext(UserContext)
  const { comment } = props

  const commenter = usersList.map(
    (user) => user._id === props.user && user.username
  )
  console.log(username)

  return (
    <div className='mb-1'>
      <p> {comment} </p>
      <p className='pb-2'>Comment By: {commenter}</p>
    </div>
  )
}

export default Comment
