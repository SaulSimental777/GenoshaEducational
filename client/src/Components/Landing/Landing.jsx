import React from 'react'
import './Landing.css'
import { PiBarbellLight } from "react-icons/pi";
import { Link } from 'react-router-dom'
import landing_image from '../../assets/landing_image.svg'

const Landing = () => {
  return (
    <div className="landing-container">
        <div className="top-logo">
            <PiBarbellLight size={50} color='#0099ff'/>
            <h1>Genosha Fitness</h1>
        </div>
        <div className="middle-logo">
            <div className="hero-container">
                <h1>Unlock your fitness potential with Genosha</h1>
                <p>
                    Genosha fitness is the ultimate fitness tracker that helps you
                    reach your goals and live a healthier life.With features like
                    calorie tracking and workout plans you'll have the tools you
                    need to take your fitness to the next level.
                </p>
                <Link to='/login-register'><button>Register/Login</button></Link>
            </div>
            <div className="hero-image">
                <img src={landing_image} alt="landing_image" />
            </div>
        </div>


    </div>

    
  )
}

export default Landing