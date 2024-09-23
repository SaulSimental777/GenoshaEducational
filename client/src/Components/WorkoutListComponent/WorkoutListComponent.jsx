import React, { useContext, useState, useEffect} from 'react'
import './WorkoutListComponent.css'
import { DashboardContext } from '../../Pages/DashboardLayout'
import Container from '../Container/Container'
import customFetch from '../../Utils/customFetch'

const WorkoutListComponent = () => {

    const [all_exercises, setAll_Exercise] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
    //Todos los ejercicios
  
    useEffect(() => {
      const fetchAllWorkout = async () => {
        try {
          const { data } = await customFetch.get('/exercises/allexercises');
          setAll_Exercise(data.exercises);

        } catch (error) {
            console.log(error)
        } finally {
          setIsLoading(false); // Termina la carga
        }
      };
  
      fetchAllWorkout();
    }, []);

  return (
    <div className="workout-list">
        {all_exercises.map((item, i) => (
        <Container
            key={i}
            id= {item._id}
            name={item.name}
            image={item.image}
            muscle={item.muscleGroup} />
        ))}
    </div>
  )
}

export default WorkoutListComponent