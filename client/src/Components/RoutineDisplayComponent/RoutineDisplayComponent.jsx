import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './RoutineDisplayComponent.css'
import customFetch from '../../Utils/customFetch'
import { CircleLoader } from 'react-spinners'
import { useLoaderData } from 'react-router-dom'
import RoutineCollections from '../RoutineCollections/RoutineCollections'


export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/routines/routine-workouts/${params.routineId}`);
    return data;
  }catch (error) {
    console.log(error)

  }
}

const RoutineDisplayComponent = () => {

    const {routineId} = useParams()
    const [one_routine, setOne_Routine] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { exercises } = useLoaderData()


  
  
  
    useEffect(() => {
      const fetchOneRoutine = async () => {
        try {
          const { data } = await customFetch.get(`/routines/${routineId}`);
          setOne_Routine(data.routine);
  
        } catch (error) {
            console.log(error)
        } finally {
          setIsLoading(false); 
        }
      };
  
      fetchOneRoutine();
    }, []);

    if (isLoading) {
        return <div><CircleLoader size={150} color="#0099ff" /></div>;
      }
    
      if (!one_routine) {
        return <div>Routine not found</div>;
      }



  
  return (

    <div className="routine-workout-collection">
      <div className="routine-workout-collection-container">
        {exercises.map((item, i) => {
          return <RoutineCollections key={i} id={item._id}
          name={item.name} image={item.image} description={item.description}
          muscleGroup={item.muscleGroup}/>
        })}
      </div>
    </div>
  )
}

export default RoutineDisplayComponent