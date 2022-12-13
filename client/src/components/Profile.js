import React, { useContext } from "react"
import { UserContext } from "../context/UserProvider.js"
import IssueForm from "./IssueForm.js"
import IssueList from "./IssueList.js"

const style = {
  profile: `flex flex-col items-center h-screen`,
  h1: `m-8 text-3xl`,
  h3: `m-4 underline`,
}
const Profile = () => {
  const {
    user: { username },
    addIssue,
    issues,
  } = useContext(UserContext)
  console.log(issues)
  return (
    <div className={style.profile}>
      <h1 className={style.h1}>Welcome @{username}!</h1>
      <h3>Add an Issue</h3>
      <IssueForm btnText='Add Issue' submit={addIssue} />
      {issues.length < 1 ? (
        <>
          <h1 className={style.h1}>You have no posts!</h1>
        </>
      ) : (
        <>
          <h3 className={style.h3}>Your Posts</h3>
          <IssueList issues={issues} />
        </>
      )}
    </div>
  )
}

export default Profile
