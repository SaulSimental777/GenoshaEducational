import React from 'react'
import './BigSidebar.css'
import { PiBarbellLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { ImStatsDots } from "react-icons/im";
import { LuPencilLine } from "react-icons/lu";
import { FaList } from "react-icons/fa";
import { LiaDumbbellSolid } from "react-icons/lia";
import { BiFoodMenu } from "react-icons/bi";
import { TbMessageChatbot } from "react-icons/tb";



const BigSidebar = () => {
  return (
    <div className="bigsidebar-container">
        <div className="upper-container">
            <PiBarbellLight size={100} color='#0099ff'/>
        </div>
        <div className="lower-container">
            <ul>
                <Link to='/home' style={{textDecoration: 'none', color: 'black'}}><div><ImStatsDots size={25}/><p>User Stats</p></div></Link>
                <Link to='/home/daily-log' style={{textDecoration: 'none', color: 'black'}}><div><LuPencilLine/><p>Daily Log</p></div></Link>
                <Link to='/home/routine-list' style={{textDecoration: 'none', color: 'black'}}><div><FaList/><p>Routine List</p></div></Link>
                <Link to='/home/workout-list' style={{textDecoration: 'none', color: 'black'}}><div><LiaDumbbellSolid/><p>Workout List</p></div></Link>
                <Link to='/home/recipe-list' style={{textDecoration: 'none', color: 'black'}}><div><BiFoodMenu/><p>Recipe List</p></div></Link>
                <Link to='/home/virtual-instructor' style={{textDecoration: 'none', color: 'black'}}><div><TbMessageChatbot/><p>Virtual Instructor</p></div></Link>
            </ul>
        </div>
    </div>
  )
}

export default BigSidebar