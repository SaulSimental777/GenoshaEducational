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
  DashboardLayout,
  AdminPage,
  AddWorkoutPage,
  AddFoodPage, 
  RoutineDisplayPage

} from './Pages'

import { action as registerAction } from './Components/RegisterComponent/RegisterComponent'
import { action as loginAction } from './Components/LoginComponent/LoginComponent'
import { loader as profileLoader } from './Components/HomeStatsComponent/HomeStatsComponent'
import { action as addFoodAction } from './Components/AddFoodComponent/AddFoodComponent'
import { action as addWorkoutAction } from './Components/AddWorkoutComponent/AddWorkoutComponent'
import { action as addRoutineAction } from './Components/RoutineListComponent/RoutineListComponent'
import { loader as allRoutineLoader } from './Components/WorkoutDisplayComponent/WorkoutDisplayComponent'
import { loader as getRoutineWorkout } from './Components/RoutineDisplayComponent/RoutineDisplayComponent'





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
        element:<LoginPage/>,
        action: loginAction

      },
      {
        path:"home",
        element:<DashboardLayout/>,
        loader: profileLoader,
        children:[
          {
            index:true,
            element: <HomeStatsPage/>,
            loader: profileLoader,
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
            element:<RoutineListPage/>,
            action: addRoutineAction
          },
          {
            path:"routine/:routineId",
            element: <RoutineDisplayPage/>,
            loader: getRoutineWorkout
   
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
            element:<WorkoutDisplayPage/>,
            loader: allRoutineLoader

          },
          {
            path:"daily-log",
            element:<DailyLogPage/>
          },
          {
            path:"admin",
            children:[
              {
                index: true,
                element: <AdminPage/>
              },
              {
                path: "all-workout"
              },
              {
                path:"all-food"
              },
              {
                path:"add-workout",
                element:<AddWorkoutPage/>,
                action: addWorkoutAction
              },
              {
                path:"add-food",
                element: <AddFoodPage/>,
                action: addFoodAction
              },
              {
                path:"edit-workout/:workoutId"
              },
              {
                path:"edit-food/:foodId"
              }
            ]
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
