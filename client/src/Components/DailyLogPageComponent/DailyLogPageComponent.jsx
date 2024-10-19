import React, {useEffect, useState} from 'react'
import './DailyLogPageComponent.css'
import customFetch from '../../Utils/customFetch'
import { PiBarbellLight } from "react-icons/pi";
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

export const loader = async () => {
    try {
      const { data } = await customFetch.get('/users/profile');
      return data;
    }catch (error) {
      console.log(error)
      return redirect('/');

    }
  }



const DailyLogPageComponent = () => {

    const [dailyLogResponse, setDailyLog] = useState([]);
    const [routinesResponse, setRoutinesLog] = useState([]);
    const [recipesResponse, setRecipesLog] = useState([]);

    const[showRoutines, setShowRoutines] = useState(false)
    const[showRecipes, setShowRecipes] = useState(false)
    const { user } = useLoaderData();




    const toggleList = () => {
        setShowRoutines(!showRoutines)
        setShowRecipes(!showRecipes)
    }
  
  
  
    useEffect(() => {
      const fetchDailyLog = async () => {
        try {
          const dailyLogResponse = await customFetch.get('/dailylog/addDailyLog');
          setDailyLog(dailyLogResponse.data);

          const  routinesResponse  = await customFetch.get('/routines/allroutines');
          setRoutinesLog(routinesResponse.data.routines);

          const recipesResponse = await customFetch.get('/recipes/allrecipes');
          setRecipesLog(recipesResponse.data);
  
        } catch (error) {
            console.log(error)
        } 
      };
  
      fetchDailyLog();
    }, []);

    // Agregar rutina al registro diario

    const addRoutine = async (routineId) => {

        try {
            const response = await customFetch.post('dailylog/addRecipeLog', {
              routineId: routineId,
              userId: user._id
            });
            toast.success('Routine Added')
          } catch (error) {
            toast.error(error?.response?.data?.msg)
            return error;
          }

    }


    
  

  return (
    <div className="dailylog-container">
        <button onClick={toggleList}>Equis de</button>
        <div className={showRoutines?
        "routines-list-display show-list":"routines-list-display"}>
            {routinesResponse.map((routines, index)=>{
                return <><div key={index} className="routine-list-display-format">
                <div className="routine-list-display-format-text">
                    <h1>{routines.name}</h1>
                    <p>{routines.createdBy}</p>
                    <PiBarbellLight size={50} color='0099ff'/>
                </div>
                <div className="routine-display-add-button">
                    <button onClick={() => addRoutine(routines._id)}>ADD</button>
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

export default DailyLogPageComponent