import React, { useEffect, useState} from 'react'
import './FoodListComponent.css'
import customFetch from '../../Utils/customFetch'
import FoodContainer from '../FoodContainer/FoodContainer';

const FoodListComponent = () => {

    const [all_food, setAll_Food] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
    //Todos los ejercicios
  
    useEffect(() => {
      const fetchAllFood = async () => {
        try {
          const { data } = await customFetch.get('/food/allfood');
          setAll_Food(data.foods);
        } catch (error) {
            console.log(error)
        } finally {
          setIsLoading(false); 
        }
      };
  
      fetchAllFood();
    }, []);

  return (
    <div className="food-list">
        {all_food.map((item, i) => (
        <FoodContainer
            key={i}
            id= {item._id}
            name={item.name}
            image={item.image}
            portion={item.portionSize} />
        ))}
    </div>
  )
}

export default FoodListComponent