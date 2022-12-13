import React, { useState, useContext } from "react"
import AuthForm from "./AuthForm.js"
import { UserContext } from "../context/UserProvider.js"

const style = {
  container: `flex flex-col items-center h-screen`,
  h1: `text-2xl m-6`,
  p: `m-4 underline`,
}

const Auth = () => {
  const initInputs = { username: "", password: "" }
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }))
  }

  const handleSignup = (e) => {
    e.preventDefault()
    signup(inputs)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    login(inputs)
  }

  const toggleForm = () => {
    setToggle((prev) => !prev)
    resetAuthErr()
  }
  return (
    <div>
      {!toggle ? (
        <section className='bg-gray-50'>
          <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <h1 className='text-2xl font-semibold mb-6 text-gray-900'>
              Social Media App
            </h1>
            <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900'>
                  Sign in to your account
                </h1>
                <AuthForm
                  handleChange={handleChange}
                  handleSubmit={handleSignup}
                  inputs={inputs}
                  btnText='Sign up'
                  errMsg={errMsg}
                />
                <p onClick={toggleForm}>Already a member?</p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className='bg-gray-50'>
          <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <h1 className='text-2xl font-semibold mb-6 text-gray-900'>
              Social Media App
            </h1>
            <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900'>
                  Sign in to your account
                </h1>
                <AuthForm
                  handleChange={handleChange}
                  handleSubmit={handleLogin}
                  inputs={inputs}
                  btnText='Login'
                  errMsg={errMsg}
                />
                <p onClick={toggleForm}>Not a member?</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Auth
