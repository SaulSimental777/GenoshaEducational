import { StatusCodes } from 'http-status-codes'
import Recipe from '../Models/recipeModel.js'
import User from '../Models/userModel.js'
import Food from '../Models/foodModel.js'

export const getAllRecipes = async (req, res) =>{
    try{
        const user = await User.findById(req.user._id).populate('recipes');
        res.status(StatusCodes.OK).json({recipes: user.recipes})
    }catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR),json({msg: 'Error retrieving recipes'})
    }

}

export const addRecipe = async (req, res) => {
    try{
        const userId = req.user._id;
        const recipe = await Recipe.create({
            ...req.body,
            createdBy:userId
        });

        res.status(StatusCodes.CREATED).json({recipe});
    } catch( error ) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Unexpected error creating the recipe'})
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

export const appendFood = async (req, res) => {
    let recipe = await Recipe.findById(req.params.id);
    let food = await Food.findOne({id: req.params.id});
    recipe.food.push(food._id)
    await recipe.save();

    res.status(StatusCodes.OK).json({msg: 'ingredient added succesfully'})

   
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