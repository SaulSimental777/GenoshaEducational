import { Router } from 'express'
import {
    getAllRoutines,
    addRoutine,
    getRoutine,
    deleteRoutine,
    appendExercise,
    removeExercise,
    updateRoutineExercise,
    updateRoutine,
} from '../Controllers/routineControllers.js'
import { validateRoutineInput } from '../Middleware/validationMiddleware.js'

const router = Router()

router.get('/allroutines', getAllRoutines);
router.post('/addroutine', validateRoutineInput, addRoutine)
router
    .route('/:id')
    .get(getRoutine)
    .patch(updateRoutine)
    .delete(deleteRoutine)

router.post('/:id/exercise', appendExercise);
router.patch('/:id/exercise/:exerciseId', updateRoutineExercise);
router.delete('/:id/exercise/:exerciseId', removeExercise);

export default router
