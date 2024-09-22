import React from 'react'
import './AdminPageComponent.css'
import { IoFastFood } from "react-icons/io5";
import { GiMuscleUp } from "react-icons/gi";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { BsPatchPlusFill } from "react-icons/bs";


const AdminPageComponent = () => {
  return (
    <div className="admin-container">
        <div className="admin-container-top">
            <div className="admin-menu-container">
                <div className="select-container">
                <TbSquareRoundedPlusFilled size={75} color='#0099ff' className='select-icon'/>
                <h1>Add Food</h1>
                </div>
            </div>
            <div className="admin-menu-container">
                <div className="select-container-large">
                    <BsPatchPlusFill size={75} color='#0099ff' className='select-icon-large'/>
                    <h1>Add Workout</h1>

                </div>
            </div>
        </div>
        <div className="admin-container-bottom">
            <div className="admin-menu-container">
                <div className="select-container">
                    <IoFastFood size={75} color='#0099ff' className='select-icon'/>
                    <h1>Food List</h1>
                </div>
            </div>
            <div className="admin-menu-container">
                <div className="select-container-large">
                    <GiMuscleUp size={75} color='#0099ff' className='select-icon-large'/>
                    <h1>Workout List</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminPageComponent