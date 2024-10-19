import { Router } from 'express'
import {
    createDailyLog,
    appendRoutine,
    appendRecipe
}
from '../Controllers/dailyLogControllers.js'


const router = Router()
router.get('/addDailyLog', createDailyLog)
router.post('/addRoutineLog', appendRoutine)
router.post('/addRecipeLog', appendRecipe)





export default router