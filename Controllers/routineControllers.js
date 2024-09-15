import { StatusCodes } from 'http-status-codes'
import Routine from '../Models/routineModel.js'
import User from '../Models/userModel.js'
import Exercise from '../Models/exerciseModel.js'

export const getAllRoutines = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).populate('routines');
        res.status(StatusCodes.OK).json({ routines: user.routines})

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error retrieving routines', error})
    }

}

export const addRoutine = async (req, res) => {
    try{
        const userId = req.user._id;

        const routine = await Routine.create({
            ...req.body,
            createdBy: userId
        });

        res.status(StatusCodes.CREATED).json({routine});

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Unexpected error creating the routine'})
    }
}

export const getRoutine = async(req, res) => {
    const routine = await Routine.findById(req.params.id)
    res.status(StatusCodes.OK).json({routine})
}

export const deleteRoutine = async(req, res) => {
    const removedRoutine = await Routine.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({ msg: 'routine deleted', routine: removedRoutine})

}

export const appendExercise = async(req, res) => {
    let routine = await Routine.findById(req.params.id);
    let exercise = await Exercise.findOne({id: req.params.id});
    routine.exercises.push(exercise._id)
    await routine.save();

    res.status(StatusCodes.OK).json({msg: 'exercise added succesfully'})


}

export const removeExercise = async(req, res) => {

    const routineId = req.params.routineId;
    const exerciseId = req.params.exerciseId;

    let routine = await Routine.findById(routineId)

    const exerciseIndex = routine.exercises.findIndex(e => e.exercise.toString() === exerciseId);
    routine.exercises.splice(exerciseIndex, 1)
    await routine.save()

    res.status(StatusCodes.OK).json({ msg: 'Exercise removed succesfully', routine})



}

export const updateRoutineExercise = async(req, res) => {
    const routineId = req.params.routineId;
    const exerciseId = req.params.exerciseId;
    const { sets, reps } = req.body

    let routine = await Routine.findById(routineId)

    const exercise = routine.exercises.find(e => e.exercise.toString() === exerciseId);

    exercise.sets = sets || exercise.sets
    exercise.reps = reps || exercise.reps
    await routine.save()

    res.status(StatusCodes.OK).json({ msg: 'Exercise updated succesfully', routine})


}

