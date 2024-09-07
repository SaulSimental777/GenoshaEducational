import React from 'react'
import './Navbar.css'
import { HiMenuAlt1 } from "react-icons/hi"
import { TiUserOutline } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="navbar-container">
        <div className="nav-left">
            <HiMenuAlt1 size={50} color='#0099ff'/>
        </div>
        <div className="nav-middle">
            <p>Welcome Back!</p>
        </div>
        <div className="nav-right">
            <button>
                <TiUserOutline size={28} color='white'/>
                <p>Aaron</p>
                <IoIosArrowDown size={28} color='white'/>
            </button>
        </div>
    </div>
  )
}

export default Navbar