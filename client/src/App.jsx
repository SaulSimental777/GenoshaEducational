import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {
  ErrorPage,
  HomeLayout,
  InstructorChatPage,
  LandingPage,
  HomeStatsPage,
  WorkoutListPage,
  RecipeListPage,
  RoutineListPage,
  FoodListPage,
  FoodDisplayPage,
  WorkoutDisplayPage,
  DailyLogPage,
  RegisterPage,
  LoginPage,
  DashboardLayout
} from './Pages'

import { action as registerAction } from './Components/RegisterComponent/RegisterComponent'





const router = createBrowserRouter([
  {
    path:"/",
    element:<HomeLayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        index:true,
        element:<LandingPage/>

      },
      {
        path:"register",
        element: <RegisterPage/>,
        action: registerAction
        

      },
      {
        path:"login",
        element:<LoginPage/>

      },
      {
        path:"home",
        element:<DashboardLayout/>,
        children:[
          {
            index:true,
            element: <HomeStatsPage/>

          },
          {
            path: "virtual-instructor",
            element:<InstructorChatPage/>
          },
          {
            path: "workout-list",
            element:<WorkoutListPage/>

          },
          {
            path:"recipe-list",
            element:<RecipeListPage/>
          },
          {
            path:"routine-list",
            element:<RoutineListPage/>
          },
          {
            path:"food-list",
            element:<FoodListPage/>

          },
          {
            path: "food/:foodId",
            element:<FoodDisplayPage/>
          },
          {
            path: "workout/:workoutId",
            element:<WorkoutDisplayPage/>

          },
          {
            path:"daily-log",
            element:<DailyLogPage/>
          }
        ]
      },

    ]

  }

]);


const App = () => {
  return (
    <RouterProvider router = { router }/>
  )
}

export default App
