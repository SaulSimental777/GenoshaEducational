import React,{ createContext, useContext, useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import SmallSideBar from '../Components/SmallSideBar/SmallSideBar'
import BigSidebar from '../Components/BigSidebar/BigSidebar'
import Navbar from '../Components/Navbar/Navbar'


export const DashboardContext = createContext()

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const toggleSideBar = () =>{
    setShowSidebar(!showSidebar)

  }

  return (
    <DashboardContext.Provider value={({
      showSidebar,
      toggleSideBar,
    })}> 
      <main className="dashboard">
        <SmallSideBar/>
        <BigSidebar/>
        <div>
          <Navbar/>
          <div className="dashboard-page">
            <Outlet/>
          </div>
        </div>
      </main>
    </DashboardContext.Provider>

  )
}

export const useDashboardContext = () => useContext
(DashboardContext);


export default DashboardLayout