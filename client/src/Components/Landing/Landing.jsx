import React from 'react'
import './Landing.css'
import { PiBookLight } from "react-icons/pi";
import { Link } from 'react-router-dom'
import landing_image from '../../assets/landing_image1.svg'

const Landing = () => {
  return (
    <div className="landing-container">
        <div className="top-logo">
            <PiBookLight size={50} color='#0099ff'/>
            <h1>Genosha Fitness</h1>
        </div>
        <div className="middle-logo">
            <div className="hero-container">
                <h1>Unlock your educational potential with Genosha</h1>
                <p>
                Genosha Educational is an innovative app that provides you with the resources you need 
                to achieve your learning goals. With features like personalized educational plans and a 
                comprehensive list of resources, it empowers you to take control of your education and succeed.
                </p>
                <div className="btn-options">
                    <Link to='/register'><button>Register</button></Link>
                    <Link to='/login'><button>Login</button></Link>
                </div>
            </div>
            <div className="hero-image">
                <img src={landing_image} alt="landing_image1" />
            </div>
        </div>


    </div>

    
  )
}

export default Landing