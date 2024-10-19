import React, { useState, useEffect} from 'react'
import './WorkoutDisplayComponent.css'
import customFetch from '../../Utils/customFetch'
import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners'
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PiBarbellLight } from "react-icons/pi";
import { toast } from 'react-toastify';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/routines/allroutines');
    return data;
  }catch (error) {
    console.log(error)

  }
}

const WorkoutDisplayComponent = () => {

    const {workoutId} = useParams()
    const [exercise, set_Exercise] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const[showList, setShowList] = useState(false)
    const routine = useLoaderData();
    const toggleList = () => {
      setShowList(!showList)
    }

    // Solicitud de un Ejercicio
    
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
        return <div>Workout not found</div>;
      }

  // Agregar ejercicio a rutina

  const addToRoutine = async (routineId) => {
    try {
      const response = await customFetch.post('routines/addExercise', {
        routineId: routineId,
        exerciseId: workoutId
      });
      toast.success('Workout Added')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
      return error;
    }
  }
    

    const imageUrl = `http://localhost:5101/${exercise.image.replace("public\\uploads\\", "")}`; // Solucion temporal


  return (
    <div className="workout-display">
      <div className="workout-display-container">
          <div className="workout-display-top">
              <div className="workout-display-top-left">
                  <img src={imageUrl} alt="workout image" />
              </div>
              <div className="workout-display-top-right">
                  <h1>{exercise.name}</h1>
                  <h3>{exercise.muscleGroup}</h3>
                  <div className="workout-display-corner">
                      <button onClick={toggleList}>Add to Routine</button>
                  </div>
              </div>
          </div>
          <hr />
          <div className="workout-display-bottom">
              <p>{exercise.description}</p>
          </div>
          <hr />
      </div>
      <div className={showList?
      "routines-list-display show-list":"routines-list-display"}>
          {routine.routines.map((routines, index)=>{
            return <><div key={index} className="routine-list-display-format">
              <div className="routine-list-display-format-text">
                <h1>{routines.name}</h1>
                <p>{routines.Id}</p>
                <PiBarbellLight size={50} color='0099ff'/>
              </div>
              <div className="routine-display-add-button">
                <button onClick={() => addToRoutine(routines._id)}>ADD</button>
              </div>
            </div>
            </>
          })}
          <div className="routine-display-cancel-button">
            <button onClick={toggleList}>CANCEL</button>
          </div>
      </div>
    </div>
  )
}

export default WorkoutDisplayComponent