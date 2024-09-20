import React from 'react'
import './RegisterComponent.css'
import { Form, redirect, useNavigation, Link} from 'react-router-dom'
import customFetch from '../../Utils/customFetch'
import { toast } from 'react-toastify'
import { PiBarbellLight } from "react-icons/pi";
import { GENDER_CATEGORY } from '../../../../Utils/Constants'
import { GOAL_CATEGORY } from '../../../../Utils/Constants'

export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post('/auth/register', data)
        toast.success('Registration Succesful')
        return redirect('/login')

        
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        return error
        
    }

}

const RegisterComponent = () => {
    const navigation = useNavigation()
    console.log(navigation);
    const isSubmitting = navigation.state === 'submitting'
  return (
    <div className="form-background">
        <Form method= 'post' className='form-container'>
            <div className="form-header">
                <PiBarbellLight size={75} color='#0099ff'/>
                <h1>Register</h1>
            </div>
            <div className="signup-fields">
                    <div className="signup-containers">
                        <p>Name</p>
                        <input name='name' type="text" required />
                    </div>
                    <div className="signup-containers">
                        <p>Last name</p>
                        <input name='lastName' type="text" required />
                    </div>
            </div>
            <div className="signup-fields">
                <div className="signup-containers">
                    <p>Email</p>
                    <input name='email' type="email"  required />
                </div>
                <div className="signup-containers">
                    <p>Password</p>
                    <input name='password' type="password"  required />
                </div>
            </div>
            <div className="signup-fields">
                <div className="signup-containers">
                    <p>Birth Date</p>
                    <input name='birthDate' type="date" placeholder= 'Birth Date' required />
                </div>
                <div className="signup-containers">
                    <p>Gender</p>
                    <select   name="gender" >
                        {Object.values(GENDER_CATEGORY).map((itemValue) => {
                        return(
                            <option key={itemValue} value= {itemValue}>
                            {itemValue}
                            </option>
                        );
                        })}
                    </select>
                </div>
            </div>
            <div className="signup-fields">
                <div className="signup-containers">
                    <p>Weight</p>
                    <input name='weight' type="number" placeholder='Kilograms'  required />
                </div>
                <div className="signup-containers">
                    <p>Height</p>
                    <input name='height' type="number" placeholder='Centimeters'  required />
                </div>
            </div>
            <div className="signup-large-field">
                <div className="signup-containers">
                    <p>Goal</p>
                    <select   name="goal" >
                        {Object.values(GOAL_CATEGORY).map((itemValue) => {
                        return(
                            <option key={itemValue} value= {itemValue}>
                            {itemValue}
                            </option>
                        );
                        })}
                    </select>
                </div>
            </div>
            <button type='submit' disabled= {isSubmitting}>
                    {isSubmitting ? 'Signing up...' : 'Sign up'}
            </button>
            <p className="signup-login">Already have an account? <Link to='/login'>Login here</Link></p>
        </Form>
    </div>
  )
}

export default RegisterComponent