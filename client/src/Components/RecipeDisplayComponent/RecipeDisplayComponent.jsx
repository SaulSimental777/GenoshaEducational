import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './RecipeDisplayComponent.css'
import customFetch from '../../Utils/customFetch'
import { CircleLoader } from 'react-spinners'
import { useLoaderData } from 'react-router-dom'
import RecipeCollections from '../RecipeCollections/RecipeCollections'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


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

    const data = [
      {
        macro:'Protein',
        A:one_recipe.totalProtein
      },
      {
        macro:'Fat',
        A: one_recipe.totalFats
      },
      {
        macro: 'Carbs',
        A: one_recipe.totalCarbs
      }

    ];
    


  return (
    <div className="recipe-food-collection">
    <div className="recipe-food-collection-container">
      {ingredients.map((item, i) => {
        return <RecipeCollections key={i} id={item._id}
        name={item.name} image={item.image} calories={item.calories} protein={item.protein}
        fats={item.fats} carbs={item.carbs}/>
      })}
    </div>
    <div className="recipe-stats">
      <div className="recipe-title">
        <h3>{one_recipe.name}</h3>
      </div>
      <div className="recipe-graph">
        <ResponsiveContainer width={500} height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="85%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="macro" />
            <PolarRadiusAxis />
            <Radar name="Macros" dataKey="A" stroke="#8884d8" fill="#0099ff" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="recipe-total">
          <div className="recipe-total-row">
            <div className="recipe-macro">
              <h3>{one_recipe.totalCalories}</h3>
              <p>Calories</p>
            </div>
            <div className="recipe-macro">
              <h3>{one_recipe.totalProtein} g</h3>
              <p>Protein</p>
            </div>
          </div>
          <div className="recipe-total-row">
            <div className="recipe-macro">
                <h3>{one_recipe.totalCarbs} g</h3>
                <p>Carbs</p>
            </div>
            <div className="recipe-macro">
              <h3>{one_recipe.totalFats} g</h3>
              <p>Fat</p>
            </div>
          </div>
      </div>
    </div>
  </div>
  )
}

export default RecipeDisplayComponent