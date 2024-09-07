import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboard from '../Components/Dashboard/Dashboard'

const DashboardLayout = () => {
  return (
    <>
      <Dashboard/>
      <Outlet/>
    </>
  )
}

export default DashboardLayout