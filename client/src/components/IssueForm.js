import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/UserProvider.js"

const style = {
  form: `flex flex-col my-4 p-4 bg-slate-400 rounded w-[300px]`,
  input: `my-2 p-2 rounded`,
  button: `my-2 p-2 rounded bg-[#efefef]`,
}

const IssueForm = (props) => {
  const initInputs = {
    title: props.title || "",
    description: props.description || "",
    imgUrl: props.imgUrl || "",
  }
  const [inputs, setInputs] = useState(initInputs)
  const { btnText, _id, submit, handleClose } = props
  const { getUserIssues } = useContext(UserContext)

  useEffect(() => {
    getUserIssues()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    // addIssue(inputs)
    submit(inputs, _id)
    setInputs(initInputs)
    handleClose && handleClose(false)
  }

  const { title, description, imgUrl } = inputs

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        type='text'
        name='title'
        value={title}
        onChange={handleChange}
        placeholder='Title'
        className={style.input}
      />
      <input
        type='text'
        name='description'
        value={description}
        onChange={handleChange}
        placeholder='Description'
        className={style.input}
      />
      <input
        type='text'
        name='imgUrl'
        value={imgUrl}
        onChange={handleChange}
        placeholder='imgUrl'
        className={style.input}
      />
      <button className={style.button}> {btnText} </button>
    </form>
  )
}

export default IssueForm
