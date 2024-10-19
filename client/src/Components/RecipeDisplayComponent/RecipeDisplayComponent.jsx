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



  const totalCalories = ingredients.reduce((total, item) => total + item.calories, 0)
  const totalProteins = ingredients.reduce((total, item) => total + item.protein, 0)
  const totalFats = ingredients.reduce((total, item) => total + item.fats, 0)
  const totalCarbs = ingredients.reduce((total, item) => total + item.carbs, 0)






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
        A:totalProteins
      },
      {
        macro:'Fat',
        A:totalFats
      },
      {
        macro: 'Carbs',
        A:totalCarbs
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
              <h3>{totalCalories}</h3>
              <p>Calories</p>
            </div>
            <div className="recipe-macro">
              <h3>{totalProteins} g</h3>
              <p>Protein</p>
            </div>
          </div>
          <div className="recipe-total-row">
            <div className="recipe-macro">
                <h3>{totalCarbs} g</h3>
                <p>Carbs</p>
            </div>
            <div className="recipe-macro">
              <h3>{totalFats} g</h3>
              <p>Fat</p>
            </div>
          </div>
      </div>
    </div>
  </div>
  )
}

export default RecipeDisplayComponent