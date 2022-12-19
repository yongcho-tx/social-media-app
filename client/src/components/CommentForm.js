import React, { useEffect, useState, useContext } from "react"
import CommentList from "./CommentList.js"
import { userAxios, UserContext } from "../context/UserProvider"
import { BiComment } from "react-icons/bi"

const style = {
  form: `flex`,
}
const CommentForm = (props) => {
  const initComment = ""
  const [comment, setComment] = useState(initComment)
  const [comments, setComments] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const { _id } = props
  const { allComments, getComments } = useContext(UserContext)

  const addComment = () => {
    userAxios
      .post(`/api/comment/${_id}`, { comment })
      .then((res) => {
        setComments((prevComments) => {
          return [...prevComments, res.data]
        })
        console.log("this is line 23 of comments: ", comments)
        console.log("this is line 24 of comments: ", res.data)
      })
      .catch((err) => console.log(err.response.data.errMsg))
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    addComment()
    setComment(initComment)
  }

  const handleShowComments = () => {
    userAxios
      .get(`/api/comment/${_id}`)
      .then((res) => {
        console.log(res.data)
        setComments(res.data)
      })
      .catch((err) => console.log(err))
    // }
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    handleShowComments()
    setIsOpen(isOpen)
  }, [])

  return (
    <>
      <div className='flex items-center gap-2.5 hover:bg-slate-300'>
        <BiComment onClick={handleShowComments} className='my-3 text-[25px]' />
        <p>{comments.length} comments</p>
      </div>
      {isOpen && (
        <>
          <form onSubmit={handleCommentSubmit} className={style.form}>
            <input
              type='text'
              name='comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='w-[80%] p-[10px] border border-[#343434] m-2'
              placeholder='add comment'
            />
            <button className='w-[80%] bg-[#efefef] m-2 h-[45px]'>
              Add Comment
            </button>
          </form>

          <div>
            <CommentList comments={comments} />
            <button
              className='my-[10px] p-[5px] w-[80%]'
              onClick={() => setIsOpen(false)}
            >
              Close Comments
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default CommentForm
