import React from 'react'
import './Dashboard.css'
import BigSidebar from '../BigSidebar/BigSidebar'
import Navbar from '../Navbar/Navbar'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
        <BigSidebar/>
        <Navbar/>
    </div>
  )
}

export default Dashboard