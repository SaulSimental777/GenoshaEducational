import React, {useState, useEffect} from 'react'
import { Form, redirect, useNavigation, Link} from 'react-router-dom'
import './RoutineListComponent.css'
import { IoIosCreate } from "react-icons/io";
import { PiBarbellLight } from "react-icons/pi";
import { toast } from 'react-toastify';
import customFetch from '../../Utils/customFetch';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

  
    try {
      await customFetch.post('/routines/addroutine', data);
      toast.success('Routine Created');
      return redirect('/home/routine-list');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
};



const RoutineListComponent = () => {

    const [showPopup, setShowPopup] = useState(false)
    const togglePopup = () =>{
      setShowPopup(!showPopup)
  
    }

    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

  const [all_routines, setAll_Routine] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchAllRoutine = async () => {
      try {
        const { data } = await customFetch.get('/routines/allroutines');
        setAll_Routine(data.routines);

      } catch (error) {
          console.log(error)
      } finally {
        setIsLoading(false); 
      }
    };

    fetchAllRoutine();
  }, []);



  return (
    <div className="routine-list">

          <div className="routine-list-container">
            {all_routines.map((routines, index)=>{
              return <><Link to={`/home/routine/${routines._id}`} style={{textDecoration: 'none', color: 'black'}}><div key={index} className="routine-list-format">
                <div className="routine-list-format-text">
                  <h1>{routines.name}</h1>
                  <p>{routines.createdBy}</p>
                </div>
                <div className="routine-list-format-logo">
                  <PiBarbellLight size={50} color='0099ff'/>
                </div>
              </div>
              </Link>
              </>
            })}
          </div>
        <div className="routine-add" onClick={togglePopup}>
            <IoIosCreate size={75} color='0099ff'/>
        </div>
        <div className={showPopup ?
        'routine-popup show-popup':'routine-popup'}>
            <div className="popup-content">
                <Form method= 'post'>
                    <div className="popup-logo">
                        <PiBarbellLight size={50} color='0099ff'/>
                    </div>
                    <div className="popup-field">
                        <p>Routine name</p>
                        <input type="text" name='name' required />
                    </div>
                      <button type='submit'  disabled = {isSubmitting} className="popup-accept" >
                          {isSubmitting ? 'Creating Routine...' : 'CREATE'}
                      </button>
                </Form>
                <button onClick={togglePopup} className="popup-accept">CANCEL</button>
            </div>
        </div>
    </div>
  )
}

export default RoutineListComponent