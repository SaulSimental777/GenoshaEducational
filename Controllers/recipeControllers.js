import { StatusCodes } from 'http-status-codes'
import Recipe from '../Models/recipeModel.js'
import User from '../Models/userModel.js'
import Food from '../Models/foodModel.js'
import jwt from 'jsonwebtoken'

export const getAllRecipes = async (req, res) =>{
    try{

        const {token} = req.cookies; 
        
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.userId
        const user = await User.findById(userId).populate('recipes');
        res.status(StatusCodes.OK).json({ recipes: user.recipes})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error retrieving routines', error})
        console.log(error)
    }

}

export const addRecipe = async (req, res) => {
    try{
        const {token} = req.cookies; 
        
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token missing' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const userId = decoded.userId;
        const user = await User.findById(userId);
        const username = user.name; 
        const userLastname = user.lastName; 

        const blockOne = `${userLastname.charAt(0)}${username.charAt(0)}`;
        const blockTwo = userId.toString().slice(-4);
        const blockThree = Math.floor(Math.random() * 1000) +1;

        const uniqueId = `${blockOne}${blockTwo}-${blockThree}`


        const recipe = await Recipe.create({
            ...req.body,
            Id: uniqueId,
            createdBy: username
        });
        user.recipes.push(recipe._id)
        await user.save()



        res.status(StatusCodes.CREATED).json({recipe});



    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Unexpected error creating the routine'})
        console.log(error)
    }
}

export const getRecipe = async(req,res) => {
    const recipe = await Recipe.findById(req.params.id)
    res.status(StatusCodes.OK).json({recipe})
}

export const deleteRecipe = async (req, res) => {
    const removedRecipe = await Recipe.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({msg: 'recipe deleted', recipe: removedRecipe})
}

export const updateRecipe = async(req, res) => {

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })

    res.status(StatusCodes.OK).json({ msg: 'recipe modified: ', recipe: updatedRecipe})

}

export const appendFood = async (req, res) => {
    const {recipeId, foodId } = req.body;

    let recipe = await Recipe.findById(recipeId)
    let food = await Food.findById(foodId);
    recipe.ingredients.push(food._id)
    await recipe.save();

    res.status(StatusCodes.OK).json({msg: 'ingredient added succesfully'})


   
}

export const getRecipeFoods = async (req, res) => {
    try {

        const recipe = await Recipe.findById(req.params.id).populate('ingredients')
        res.status(StatusCodes.OK).json({ingredients: recipe.ingredients})
        
    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error retrieving exercices', error });
        
    }
}

export const removeFood = async (req, res) => {
    const recipeId = req.params.recipeId;
    const foodId = req.params.foodId;

    let recipe = await Recipe.findById(recipeId)

    const foodIndex = recipe.food.findIndex(e => e.food.toString() == foodId);
    recipe.food.splice(foodIndex, 1)
    await recipe.save()

    res.status(StatusCodes.OK).json({msg: 'Ingredient removed succesfully', recipe})
}

export const updateRecipeFood = async (req,res) => {
    const recipeId = req.params.recipeId;
    const foodId = req.params.foodId;
    const {quantity} = req.body
    let recipe = await Recipe.findById(recipeId)

    const food = recipe.food.find(e => e.food.toString() === foodId)

    food.quantity = quantity || food.quantity
    await recipe.save()

    res.status(StatusCodes.OK).json({ msg: 'Ingredient updated succesfully', recipe})
}