import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './RecipeDisplayComponent.css'
import customFetch from '../../Utils/customFetch'
import { CircleLoader } from 'react-spinners'
import { useLoaderData } from 'react-router-dom'
import RecipeCollections from '../RecipeCollections/RecipeCollections'

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/recipes/recipe-ingredients/${params.recipeId}`);
    return data;
  }catch (error) {
    console.log(error)

  }
}

const RecipeDisplayComponent = () => {

  const {recipeId} = useParams()
  const [one_recipe, setOne_Recipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ingredients } = useLoaderData()





  useEffect(() => {
    const fetchOneRecipe = async () => {
      try {
        const { data } = await customFetch.get(`/recipes/${recipeId}`);
        setOne_Recipe(data.recipe);

      } catch (error) {
          console.log(error)
      } finally {
        setIsLoading(false); 
      }
    };

    fetchOneRecipe();
  }, []);

  if (isLoading) {
      return <div><CircleLoader size={150} color="#0099ff" /></div>;
    }
  
    if (!one_recipe) {
      return <div>Recipe not found</div>;
    }


  return (
    <div className="recipe-workout-collection">
    <div className="recipe-workout-collection-container">
      {ingredients.map((item, i) => {
        return <RecipeCollections key={i} id={item._id}
        name={item.name} image={item.image}/>
      })}
    </div>
  </div>
  )
}

export default RecipeDisplayComponent