import React from 'react'
import './RecipeCollections.css'
import { Link } from 'react-router-dom'

const RecipeCollections = (props) => {

    const imageUrl = `http://localhost:5101/${props.image.replace("public\\uploads\\", "")}`; // Solucion temporal
  return (
    <div className="recipe-collection">

    <div className="recipecollection-right">
        <div className="recipecollection-data">
            <h2>{props.name}</h2>
            <h3>{props.calories}</h3>
            <p></p>
        </div>
        <div className="recipecollection-options">
            <button>EDIT</button>
            <button>REMOVE</button>
        </div>
    </div>
</div>
  )
}

export default RecipeCollections