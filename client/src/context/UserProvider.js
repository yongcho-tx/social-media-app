import React, { useState } from "react"
import axios from "axios"
export const UserContext = React.createContext()
export const userAxios = axios.create()

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

const UserProvider = (props) => {
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    issues: [],
    errMsg: "",
    comments: [],
  }

  const [userState, setUserState] = useState(initState)
  const [allIssues, setAllIssues] = useState([])
  const [allComments, setAllComments] = useState([])

  const signup = (credentials) => {
    axios
      .post("/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }))
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg))
  }

  const login = (credentials) => {
    axios
      .post("/auth/login", credentials)
      .then((res) => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getUserIssues()
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }))
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg))
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      issues: [],
    })
  }

  const handleAuthErr = (errMsg) => {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }))
  }

  const resetAuthErr = () => {
    setUserState((prevState) => ({
      ...prevState,
      errMsg: "",
    }))
  }

  const addIssue = (newIssue) => {
    userAxios
      .post("/api/issue", newIssue)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: [...prevState.issues, res.data],
        }))
      })
      .catch((err) => console.log(err.response.data.errMsg))
  }

  const getUserIssues = () => {
    userAxios
      .get("/api/issue/user")
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: res.data,
        }))
      })
      .catch((err) => console.log(err.response.data.errMsg))
  }

  const deleteIssue = (issueId) => {
    userAxios
      .delete(`/api/issue/${issueId}`)
      .then((res) => {
        console.log(issueId)
        return setUserState((prevState) => ({
          ...prevState,
          issues: [
            ...prevState.issues.filter((issue) => {
              console.log("remaining issue: ", issue._id)
              return issue._id !== issueId
            }),
          ],
        }))
      })
      .catch((err) => console.log(err.response.data.errMsg))
  }

  const editIssue = (updates, issueId) => {
    userAxios
      .put(`/api/issue/${issueId}`, updates)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: [
            ...prevState.issues.map((issue) =>
              issue._id !== issueId ? issue : res.data
            ),
          ],
        }))
      })
      .catch((err) => console.log(err.response.data.errMsg))
  }

  const upVote = (issueId) => {
    userAxios
      .put(`/api/issue/upvote/${issueId}`)
      .then((res) => {
        console.log(res.data)
        if (!res.data.newUpvote) {
          return alert(`You have already upvoted`)
        }
        setUserState((prevState) => ({
          ...prevState,
          issues: [
            ...prevState.issues.map((issue) =>
              issue._id !== issueId ? issue : res.data.updatedIssue
            ),
          ],
        }))
      })
      .catch((err) => console.log(err.response.data.errMsg))
  }

  const downVote = (issueId) => {
    userAxios
      .put(`/api/issue/downvote/${issueId}`)
      .then((res) => {
        console.log(res.data)
        if (!res.data.newDownvote) {
          return alert(`You have already downvoted`)
        }
        setUserState((prevState) => ({
          ...prevState,
          issues: [
            ...prevState.issues.map((issue) =>
              issue._id !== issueId ? issue : res.data.updatedIssue
            ),
          ],
        }))
      })
      .catch((err) => console.log(err.response.data.errMsg))
  }

  const getAllIssues = () => {
    userAxios
      .get(`/api/issue`)
      .then((res) => {
        console.log(res.data)
        setAllIssues(res.data)
      })
      .catch((err) => console.log(err.response.data.errMsg))
  }

  const getComments = () => {
    userAxios
      .get(`/api/comment`)
      .then((res) => {
        console.log(res.data)
        setAllComments(res.data)
      })
      .catch((err) => console.log(err.response.data.errMsg))
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addIssue,
        resetAuthErr,
        getUserIssues,
        setUserState,
        deleteIssue,
        editIssue,
        upVote,
        downVote,
        getAllIssues,
        allIssues,
        getComments,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
