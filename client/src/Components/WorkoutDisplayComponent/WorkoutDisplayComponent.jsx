import React, { useState, useEffect} from 'react'
import './WorkoutDisplayComponent.css'
import customFetch from '../../Utils/customFetch'
import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners'

const WorkoutDisplayComponent = () => {

    const {workoutId} = useParams()
    const [exercise, set_Exercise] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const fetchWorkout = async () => {
        try {
          const { data } = await customFetch.get(`/exercises/${workoutId}`);
          set_Exercise(data.exercise);

        } catch (error) {
            console.log(error)
        } finally {
          setIsLoading(false); 
        }
      };
  
      fetchWorkout();
    }, []);

    if (isLoading) {
        return <div><CircleLoader size={150} color="#0099ff" /></div>;
      }
    
      if (!exercise) {
        return <div>Product not found</div>;
      }
    

    const imageUrl = `http://localhost:5101/${exercise.image.replace("public\\uploads\\", "")}`; // Solucion temporal

  return (
    <div className="workout-display-container">
        <div className="workout-display-top">
            <div className="workout-display-top-left">
                <img src={imageUrl} alt="workout image" />
            </div>
            <div className="workout-display-top-right">
                <h1>{exercise.name}</h1>
                <h3>{exercise.muscleGroup}</h3>
                <div className="workout-display-corner">
                    <button>Add to Routine</button>
                </div>
            </div>
        </div>
        <hr />
        <div className="workout-display-bottom">
            <p>{exercise.description}</p>
        </div>
        <hr />
    </div>
  )
}

export default WorkoutDisplayComponent