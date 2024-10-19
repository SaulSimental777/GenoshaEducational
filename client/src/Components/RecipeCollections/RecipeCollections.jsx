import React from 'react'
import './RecipeCollections.css'
import { Link } from 'react-router-dom'

const RecipeCollections = (props) => {


  return (
    <div className="recipe-collection">

    <div className="recipecollection-right">
      <div className="recipecollection-name">
        <h3>{props.name}</h3>
      </div>
        <div className="ingredient-data">
        <div className="ingredient-total">
          <div className="ingredient-total-row">
            <div className="ingredient-macro">
              <h3>{props.calories}</h3>
              <p>Calories</p>
            </div>
            <div className="ingredient-macro">
              <h3>{props.protein} g</h3>
              <p>Protein</p>
            </div>
          </div>
          <div className="ingredient-total-row">
            <div className="ingredient-macro">
                <h3>{props.carbs} g</h3>
                <p>Carbs</p>
            </div>
            <div className="ingredient-macro">
              <h3>{props.fats} g</h3>
              <p>Fat</p>
            </div>
          </div>
      </div>
        </div>
        <div className="recipecollection-options">
            <button>PORTION</button>
            <button>REMOVE</button>
        </div>
    </div>
</div>
  )
}

export default RecipeCollections