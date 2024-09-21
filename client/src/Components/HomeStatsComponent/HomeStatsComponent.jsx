import React from 'react'
import './HomeStatsComponent.css'
import { redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../../Utils/customFetch';
import { GiWeightScale } from "react-icons/gi";
import { CiLineHeight } from "react-icons/ci";
import { GiBiceps } from "react-icons/gi";
import { BiStats } from "react-icons/bi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

export const loader = async () => {
    try {
      const { data } = await customFetch.get('/users/profile');
      return data;
    }catch (error) {
      console.log(error)
      return redirect('/');

    }
  }

const HomeStatsComponent = () => {
  const { user } = useLoaderData();
  

  // Edad del usuario
  const birthDate = new Date(user.birthDate)
  const actualDate = new Date()
  let age = actualDate.getFullYear() - birthDate.getFullYear();

  const monthDiff = actualDate.getMonth() - birthDate.getMonth();
  const dayDiff = actualDate.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  // IMC del usuario

  const userWeight = user.weight
  const userHeight = (user.height / 100)

  let IMC = Math.round((userWeight/(userHeight*userHeight)))

    // Porcentaje de grasa segun el IMC (menos preciso)

    let BFP = 0
    if(user.gender = 'Male'){
    BFP = (1.20 * IMC) + (0.23 * age) - (10.8 * 1) -5.4

    }
    else{
    BFP = (1.20 * IMC) + (0.23 * age) - (10.8 * 0) -5.4
    }


// Masa magra (estimado)

let LBM = user.weight * (1 - (BFP/100))

  // Formula de Harris Benedict

  let Harris_TMB = 0
  let TotalHarris_TMB = 0
if (user.gender == 'Male') {
    Harris_TMB = Math.round((88.362 + (13.397 * userWeight) + (4.799 * user.height) - (5.677 * age)))
    if (user.pal === 'Extremely inactive'){
        TotalHarris_TMB = Harris_TMB * 1.2
    }
    else if (user.pal === 'Sedentary'){
        TotalHarris_TMB = Harris_TMB * 1.375
    }
    else if( user.pal === 'Moderately active'){
        TotalHarris_TMB = Harris_TMB * 1.55
    }
    else if (user.pal === 'Vigorously active'){
        TotalHarris_TMB = Harris_TMB * 1.725
    }
    else{
        TotalHarris_TMB = Harris_TMB * 1.9
    }

    
}else{
    Harris_TMB = Math.round((447.593 + (9.247 * userWeight) + (3.098 * userHeight) - (4.330 * age)))
    if (user.pal === 'Extremely inactive'){
        TotalHarris_TMB = Harris_TMB * 1.2
    }
    else if (user.pal === 'Sedentary'){
        TotalHarris_TMB = Harris_TMB * 1.375
    }
    else if( user.pal === 'Moderately active'){
        TotalHarris_TMB = Harris_TMB * 1.55
        console.log('Calorias diarias = ', TotalHarris_TMB)
    }
    else if (user.pal === 'Vigorously active'){
        TotalHarris_TMB = Harris_TMB * 1.725
    }
    else{
        TotalHarris_TMB = Harris_TMB * 1.9
    }
}

let userTotalCalories = 0
let harrisProtein = 0
let harrisFat = 0
let harrisCarbs = 0

if(user.goal === 'Lose weight'){
    userTotalCalories = TotalHarris_TMB - 500
    harrisProtein = 2.2 * user.weight
    harrisFat = (0.30 * userTotalCalories) / 9
    harrisCarbs = (userTotalCalories - ((harrisProtein * 4) + (0.30 * userTotalCalories))) / 4

}
else if (user.goal === 'Gain muscle'){
    userTotalCalories = TotalHarris_TMB + 500
    harrisProtein = 1.8 * user.weight
    harrisFat = (0.25 * userTotalCalories) / 9
    harrisCarbs = (userTotalCalories - ((harrisProtein * 4) + (0.25 * userTotalCalories))) / 4
}
else {
    userTotalCalories = TotalHarris_TMB
    userTotalCalories = TotalHarris_TMB + 500
    harrisProtein = 2.0 * user.weight
    harrisFat = (0.30 * userTotalCalories) / 9
    harrisCarbs = (userTotalCalories - ((harrisProtein * 4) + (0.25 * userTotalCalories))) / 4
}


// Formula de Mifflin-St Jeor

let Mifflin_TMB = 0;

if(user.gender = 'Male'){
    Mifflin_TMB = (10 * user.weight) + (6.25 * user.height) - (5*age) + 5
}
else{
    Mifflin_TMB = (10 * user.weight) + (6.25 * user.height) - (5 * age) - 161
}


let CaloriesMifflin = 0
let mifflinProtein = 0
let mifflinFat = 0
let mifflinCarbs = 0

if(user.goal === 'Lose weight'){
    CaloriesMifflin = Mifflin_TMB - 500
    mifflinProtein = 2.2 * user.weight
    mifflinFat = (0.30 * CaloriesMifflin) / 9
    mifflinCarbs = (CaloriesMifflin - ((mifflinProtein * 4) + (0.30 * CaloriesMifflin))) / 4

}
else if (user.goal === 'Gain muscle'){
    CaloriesMifflin = Mifflin_TMB + 500
    mifflinProtein = 1.8 * user.weight
    mifflinFat = (0.25 * CaloriesMifflin) / 9
    mifflinCarbs = (CaloriesMifflin - ((mifflinProtein * 4) + (0.25 * CaloriesMifflin))) / 4
}
else {
    CaloriesMifflin = Mifflin_TMB
    CaloriesMifflin = Mifflin_TMB + 500
    mifflinProtein = 2.0 * user.weight
    mifflinFat = (0.30 * CaloriesMifflin) / 9
    mifflinCarbs = (CaloriesMifflin - ((mifflinProtein * 4) + (0.25 * CaloriesMifflin))) / 4
}


// Formula de Katch-McArdle

let Katch_TMB = 370 + (21.6 * LBM)
let TotalKatch_TMB= 0

if (user.pal === 'Extremely inactive'){
    TotalKatch_TMB = Katch_TMB * 1.2
}
else if (user.pal === 'Sedentary'){
    TotalKatch_TMB = Katch_TMB * 1.375
}
else if( user.pal === 'Moderately active'){
    TotalKatch_TMB = Katch_TMB * 1.55
}
else if (user.pal === 'Vigorously active'){
    TotalKatch_TMB = Katch_TMB * 1.725
}
else{
    TotalKatch_TMB = Katch_TMB * 1.9
}


let CaloriesKatch = 0
let katchProtein = 0
let katchFat = 0
let katchCarbs = 0

if(user.goal === 'Lose weight'){
    CaloriesKatch = TotalKatch_TMB - 500
    katchProtein = 2.2 * user.weight
    katchFat = (0.30 * CaloriesKatch) / 9
    katchCarbs = (CaloriesKatch - ((katchProtein * 4) + (0.30 * CaloriesKatch))) / 4

}
else if (user.goal === 'Gain muscle'){
    CaloriesKatch = TotalKatch_TMB + 500
    katchProtein = 1.8 * user.weight
    katchFat = (0.25 * CaloriesKatch) / 9
    katchCarbs = (CaloriesKatch - ((katchProtein * 4) + (0.25 * CaloriesKatch))) / 4
}
else {
    CaloriesKatch = TotalKatch_TMB
    katchProtein = 2.0 * user.weight
    katchFat = (0.30 * CaloriesKatch) / 9
    katchCarbs = (CaloriesKatch - ((katchProtein * 4) + (0.30 * CaloriesKatch))) / 4
}


  return (
    <div className="stats-cotntainer">
        <div className="userData-container">
            <div className="userData-left-container">
                <div className="name-container">
                    <h2>{user.name}</h2><h2>{user.lastName}</h2>
                </div>
                <div className="data-container">
                    <LiaBirthdayCakeSolid size={25}/>
                    <p>Age:</p><p>{age}</p>
                </div>
                <div className="data-container">
                    <GiWeightScale size={25}/>
                    <p>Weight:</p><p>{user.weight} kg</p>
                </div>
                <div className="data-container">
                    <CiLineHeight size={25}/>
                    <p>Height:</p><p>{user.height} cm</p>
                </div>
                <div className="data-container">
                    <GiBiceps size={25}/>
                    <p>Estimated Lean Mass:</p><p>{Math.round(LBM)} kg</p>
                </div>
            </div>
            <div className="bmi-container">
                <div className="data-container">
                    <BiStats/>
                    <p>Body Mass Index</p><p>{Math.round(IMC)}</p>
                </div>
            </div>
            <div className="bfp-container">
                <p>Body Fat Percentage</p><p>{Math.round(BFP)}</p>
            </div>
        </div>
        <div className="calories-container">
            <div className="macros-container">
                <h3>Harris Benedict</h3>

            </div>
            <div className="macros-container">
                <h3>Mifflin-St Jeor</h3>

            </div>
            <div className="macros-container">
                <h3>Katch-McArdle</h3>

            </div>
        </div>

    </div>
  )
}

export default HomeStatsComponent