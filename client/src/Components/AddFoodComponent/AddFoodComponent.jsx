import React from 'react'
import './AddFoodComponent.css'
import { PiBarbellLight } from "react-icons/pi";
import customFetch from '../../Utils/customFetch';
import { toast } from 'react-toastify'
import { Form, redirect, useNavigation } from 'react-router-dom'

export const action = async ({ request }) => {
    const formData = await request.formData();
  
  
    try {
      await customFetch.post('/food/addfood', formData);
      toast.success('Food Added');
      return redirect('/home/admin/add-food');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
};

const AddFoodComponent = () => {

    const navigation = useNavigation()
    console.log(navigation);
    const isSubmitting = navigation.state === 'submitting'

  return (
    <Form method= 'post' className="admin-add-food-container" encType='multipart/form-data'>
        <div className="admin-add-food-logo">
            <PiBarbellLight size={75} color='#0099ff'/>
        </div>
        <div className="admin-add-food-data">
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Name</p>
                    <input type="text" name='name' />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Portion Size (g)</p>
                    <input type="number" name='portionSize' />
                </div>
            </div>
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Calories</p>
                    <input type="number" name='calories' />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Proteins</p>
                    <input type="number" name='protein' />
                </div>
            </div>
            <div className="admin-add-food-data-container">
                <div className="admin-add-food-itemfield">
                    <p>Fats</p>
                    <input type="number" name='fats' />
                </div>
                <div className="admin-add-food-itemfield">
                    <p>Carbs</p>
                    <input type="number" name='carbs' />
                </div>
            </div>
        </div>
        <div className="admin-add-food-image">
            <label htmlFor="image">
                <div className="area">
                <p>Image</p>
                <input  type="file" name='image' id='image' accept= 'image/*'/>
                </div>
            </label>
        </div>
        <div className="admin-add-food-button">
            <button type= 'submit' disabled = {isSubmitting}>{isSubmitting ? 'Adding Product...' : 'ADD'}</button>
        </div>
    </Form>
  )
}

export default AddFoodComponent