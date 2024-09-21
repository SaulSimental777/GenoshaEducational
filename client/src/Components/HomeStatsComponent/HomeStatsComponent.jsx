import React from 'react'
import './HomeStatsComponent.css'
import { redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../../Utils/customFetch';

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
  const userAge = new Date(user.birthDate)
  const actualDate = new Date()
  let age = actualDate.getFullYear() - userAge.getFullYear();

  const monthDiff = actualDate.getMonth() - userAge.getMonth();
  const dayDiff = actualDate.getDate() - userAge.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  console.log(age)

  // IMC del usuario

  const userWeight = user.weight
  const userHeight = (user.height / 100)

  let IMC = Math.round((userWeight/(userHeight*userHeight)))
  console.log(IMC)

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

console.log('Harris total = ', Math.round(TotalHarris_TMB))

// Formula de Mifflin-St Jeor

let Mifflin_TMB = 0;

if(user.gender = 'Male'){
    Mifflin_TMB = (10 * user.weight) + (6.25 * user.height) - (5*age) + 5
}
else{
    Mifflin_TMB = (10 * user.weight) + (6.25 * user.height) - (5 * age) - 161
}

console.log('Mifflin total = ', Mifflin_TMB)




  return (
    <div>HomeStatsComponent</div>
  )
}

export default HomeStatsComponent