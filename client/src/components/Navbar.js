import React from "react"
import { Link } from "react-router-dom"

const style = {
  navbar: `flex items-center justify-around h-[5em] bg-[#343434]`,
  link: `px-4 text-white`,
  button: `bg-[#343434] cursor-pointer text-white pr-4`,
}
const Navbar = (props) => {
  const { logout } = props
  return (
    <div className={style.navbar}>
      <Link to='/profile' className={style.link}>
        Profile
      </Link>
      <Link to='/public' className={style.link}>
        Public
      </Link>
      <button onClick={logout} className={style.button}>
        Logout
      </button>
    </div>
  )
}

export default Navbar
