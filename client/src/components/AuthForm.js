import React from "react"

const style = {
  input: `bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600
  block w-full p-2.5`,
  label: `block mb-2 text-sm font-medium text-gray-900`,
  button: `w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
  rounded-lg text-sm px-5 py-2.5 text-center`,
}
const AuthForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    btnText,
    errMsg,
    inputs: { username, password },
    toggleForm,
  } = props

  return (
    <>
      <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
        <div>
          <label for={username} className={style.label}>
            Your username
          </label>
          <input
            type='text'
            value={username}
            name='username'
            onChange={handleChange}
            placeholder='Username'
            className={style.input}
          />
        </div>
        <div>
          <label for={password} className={style.label}>
            Password
          </label>
          <input
            type='text'
            value={password}
            name='password'
            onChange={handleChange}
            placeholder='••••••••'
            className={style.input}
          />
        </div>
        <button className={style.button}>{btnText}</button>
        <p style={{ color: "red" }}>{errMsg}</p>
      </form>
    </>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  )
}

export default AuthForm
