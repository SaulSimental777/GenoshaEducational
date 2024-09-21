import React from 'react'
import './LoginComponent.css'
import { Link, Form, redirect, useNavigation } from 'react-router-dom'
import customFetch from '../../Utils/customFetch';
import { toast } from "react-toastify";

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
    <div className="loginsignup">
        <div className="loginsignup-background">
            <Form method = 'post' className="loginsignup-container">
                <h1>Welcome Back!</h1>
                <p>Sign up today to unlock exclusive content, discounts,
                     and a community of fellow comic book enthusiasts.</p>
                <div className="loginsignup-fields">
                    <input name='email' type="email" placeholder='Email' />
                </div>
                <div className="loginsignup-password">
                 <input name='password' type="password" placeholder='Password' />
                </div>
                <button type='submit' disabled= {isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Log in'}
                </button>
                <p className="loginsignup-login">Dont have an account yet? <Link to='/register'>Sign up here</Link></p>
            </Form>
        </div>
        
    </div>
  )
}

export default LoginComponent