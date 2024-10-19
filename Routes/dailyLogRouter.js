import { Router } from 'express'
import {
    createDailyLog,
    appendRoutine
}
from '../Controllers/dailyLogControllers.js'


const router = Router()
router.get('/addDailyLog', createDailyLog)
router.post('/addRecipeLog', appendRoutine)





export default router