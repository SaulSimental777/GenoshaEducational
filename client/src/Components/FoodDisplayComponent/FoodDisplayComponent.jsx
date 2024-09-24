import React, {useState, useEffect} from 'react'
import './FoodDisplayComponent.css'
import customFetch from '../../Utils/customFetch'
import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners'

const FoodDisplayComponent = () => {

    const {foodId} = useParams()
    const [food, set_Food] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const fetchFood = async () => {
        try {
          const { data } = await customFetch.get(`/food/${foodId}`);
          set_Food(data.food);

        } catch (error) {
            console.log(error)
        } finally {
          setIsLoading(false); 
        }
      };
  
      fetchFood();
    }, []);

    if (isLoading) {
        return <div><CircleLoader size={150} color="#0099ff" /></div>;
      }
    
      if (!food) {
        return <div>Food not found</div>;
      }
    

    const imageUrl = `http://localhost:5101/${food.image.replace("public\\uploads\\", "")}`; // Solucion temporal

  return (
    <div className="food-display-container">
        <div className="food-display-top">
            <div className="food-display-top-left">
                <img src={imageUrl} alt="" />
            </div>
            <div className="food-display-top-right">
                <h1>{food.name}</h1>
                <h3>Serving Size {food.portionSize} g</h3>
                <button>Add to Recipe</button>
            </div>
        </div>
        <hr  className='calorie-division'/>
        <div className="food-display-bottom">
            <div className="food-display-values-container">
                <h1>Calories</h1>
                <h1>{food.calories}</h1>
            </div>
            <hr  className='macros-division'/>
            <div className="food-display-values-container">
                <h3>Protein</h3>
                <h3>{food.protein} g</h3>
            </div>
            <hr />
            <div className="food-display-values-container">
                <h3>Total Fat</h3>
                <h3>{food.fats} g</h3>
            </div>
            <hr />
            <div className="food-display-values-container">
                <h3>Total Carbohydrate</h3>
                <h3>{food.carbs} g</h3>
            </div>
            <hr  className='calorie-division'/>
        </div>
    </div>
  )
}

export default FoodDisplayComponent