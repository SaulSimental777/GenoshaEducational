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
    getRoutineExercises,
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

router.post('/addExercise', appendExercise);
router.get('/routine-workouts/:id', getRoutineExercises);
router.patch('/:id/exercise/:exerciseId', updateRoutineExercise);
router.delete('/:id/exercise/:exerciseId', removeExercise);

export default router
