import { Router } from 'express'
import {
    getAllRecipes,
    addRecipe,
    getRecipe,
    deleteRecipe,
    updateRecipe,
    appendFood,
    removeFood,
    updateRecipeFood,
    getRecipeFoods


} from '../Controllers/recipeControllers.js'
import { validateRecipeInput } from '../Middleware/validationMiddleware.js'

const router = Router()

router.get('/allrecipes', getAllRecipes);
router.post('/addrecipe', validateRecipeInput, addRecipe)
router
    .route('/:id')
    .get(getRecipe)
    .patch(updateRecipe)
    .delete(deleteRecipe)

router.post('/addIngredient', appendFood);
router.get('/recipe-ingredients/:id', getRecipeFoods)
router.patch('/:id/food/:foodId', updateRecipeFood);
router.delete('/:id/food/:foodId', removeFood);

export default router