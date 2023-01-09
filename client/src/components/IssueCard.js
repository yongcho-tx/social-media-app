import React, { useContext, useState, useEffect } from "react"
import CommentForm from "./CommentForm.js"
import { UserContext } from "../context/UserProvider.js"
import { userAxios } from "../context/UserProvider"
import IssueForm from "./IssueForm.js"
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi"
import { BsThreeDots } from "react-icons/bs"

const style = {
  cardContainer: `border border-black rounded-lg m-5`,
  card: `flex flex-col m-4`,
  header: `flex justify-between`,
  img: `max-h-[screen] max-w-[500px] my-3`,
  h1: `text-2xl`,
  p: `my-[10px]`,
  cardActions: `flex justify-between items-center`,
  rating: `flex gap-2`,
  delete: `my-[10px] p-[10px] w-9/12`,
  edit: `my-[10px] p-[10px] w-9/12`,
}

const IssueCard = (props) => {
  const { title, description, _id, user, comment, imgUrl, upvotes, downvotes } =
    props
  const [upvotesCount, setUpvotesCount] = useState(upvotes.length)
  const [downvotesCount, setDownvotesCount] = useState(downvotes.length)
  const [editToggle, setEditToggle] = useState(false)
  const [isVoted, setIsVoted] = useState(false)
  const [menu, setMenu] = useState(false)
  const {
    deleteIssue,
    getUserIssues,
    editIssue,
    user: { username },
    usersList,
    getUsersList,
    allIssues,
  } = useContext(UserContext)

  useEffect(() => {
    getUserIssues()
  }, [downvotesCount, upvotesCount])

  useEffect(() => {
    getUsersList()
  }, [])

  const handleUpvote = () => {
    userAxios
      .put(`/api/issue/upvote/${_id}`)
      .then((res) => {
        console.log(`this is res.data.upvotes ${res.data.upvotes}`)
        setUpvotesCount(res.data.upvotes.length)
        setDownvotesCount(res.data.downvotes.length)
      })
      .catch((err) => console.log(err))
  }
  const handleDownvote = () => {
    userAxios
      .put(`/api/issue/downvote/${_id}`)
      .then((res) => {
        console.log(res.data.downvotes)
        setDownvotesCount(res.data.downvotes.length)
        setUpvotesCount(res.data.upvotes.length)
      })
      .catch((err) => console.log(err))
  }

  const handleMenuClick = () => setMenu(!menu)

  const originalPoster = usersList.map(
    (user) => user._id === props.user && user.username
  )
  const userIdentity = allIssues.map((issue) => issue.user)
  console.log(props.user)
  console.log(userIdentity)

  return (
    <div className={style.cardContainer}>
      {!editToggle ? (
        <div className={style.card}>
          <div className={style.header}>
            <h1 className={style.h1}>{title}</h1>
            {/* //three dot menubar */}
            <BsThreeDots
              onClick={handleMenuClick}
              className='text-[25px] hover:bg-slate-100'
            />
          </div>
          {/* Card menu */}
          <div
            className={
              !menu
                ? "hidden"
                : "w-full h-full bg-slate-300 flex flex-col items-center justify-center rounded"
            }
          >
            <button
              className='py-3 text-xl'
              onClick={() =>
                originalPoster === userIdentity
                  ? deleteIssue(_id)
                  : alert("You do not have autority to delete this issue")
              }
            >
              delete
            </button>
            <button
              className='py-3 text-xl'
              onClick={() => setEditToggle((prevToggle) => !prevToggle)}
            >
              edit
            </button>
            <button className='py-3 text-xl' onClick={handleMenuClick}>
              cancel
            </button>
          </div>
          <p className={style.p}>{description}</p>
          <img src={imgUrl} className={style.img}></img>
          <div className={style.cardActions}>
            <div className={style.rating}>
              <FiThumbsUp
                onClick={handleUpvote}
                className={
                  (upvotesCount > 0 && upvotesCount > downvotesCount) ||
                  upvotesCount > downvotesCount
                    ? "text-blue-600 text-[25px] hover:bg-slate-400"
                    : "text-[25px] hover:bg-slate-300"
                }
              />
              {upvotesCount}
              <FiThumbsDown
                onClick={handleDownvote}
                className={
                  (downvotesCount > 0 && downvotesCount > upvotesCount) ||
                  downvotesCount > upvotesCount
                    ? "text-blue-600 text-[25px] hover:bg-slate-300"
                    : "text-[25px] hover:bg-slate-300"
                }
              />
              {downvotesCount}
            </div>
            {/* <p>Total Votes: {upvotesCount + downvotesCount}</p> */}
            <div className={style.comment}>
              <CommentForm _id={_id} />
            </div>
          </div>
          <p>Posted by: {originalPoster}</p>
        </div>
      ) : (
        <>
          <IssueForm
            title={title}
            description={description}
            imgUrl={imgUrl}
            btnText='Submit Edit'
            _id={_id}
            submit={editIssue}
            handleClose={setEditToggle}
          />
          <button onClick={() => setEditToggle((prevToggle) => !prevToggle)}>
            Close
          </button>
        </>
      )}
    </div>
  )
}

export default IssueCard
