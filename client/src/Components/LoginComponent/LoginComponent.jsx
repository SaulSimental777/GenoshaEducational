import React from 'react'
import './LoginComponent.css'
import { Link, Form, redirect, useNavigation } from 'react-router-dom'
import customFetch from '../../Utils/customFetch';
import { toast } from "react-toastify";
import { PiBookLight } from "react-icons/pi";

export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post('/auth/login', data)
        toast.success('Login Succesful')
        return redirect('/home')

        
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        return error
        
    }

}

const LoginComponent = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
        <Form method = 'post' className="login-container">
            <div className="form-header">
                <PiBookLight size={75} color='#0099ff'/>
                <h1>Login</h1>
            </div>
            <div className="login-fields">
                <div className="login-containers">
                    <p>Email</p>
                   <input name='email' type="email" placeholder='Email' />
                </div>
            </div>
            <div className="login-fields">
            <div className="login-containers">
                <p>Password</p>
                <input name='password' type="password" placeholder='Password' />
            </div>
            </div>
            <button type='submit' disabled= {isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
            <p className="signup-login">Dont have an account yet? <Link to='/register'>Sign up here</Link></p>
        </Form>
  )
}

export default LoginComponent