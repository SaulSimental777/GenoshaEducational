import { StatusCodes } from "http-status-codes";
import DailyLog from '../Models/dailyLogModel.js'
import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'


export const createDailyLog = async (req, res) => {

    const {token} = req.cookies; 

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    const today = new Date();
    const startofDay = new Date(today.setHours(0, 0, 0, 0));
    const endofDay = new Date(today.setHours(23, 59, 59, 999));

    let dailyLog = await DailyLog.findOne({
        userId,
        date: { $gte: startofDay, $lt: endofDay }
    }).populate([
        { path: 'routineLog'},
        { path: 'recipeLog'}
    ])

    if(!dailyLog) {
        dailyLog = new DailyLog({ userId });
        await dailyLog.save();
        res.status(StatusCodes.CREATED).json({dailyLog});
    }

    res.status(StatusCodes.OK).json({dailyLog});

    return dailyLog

    

}


export const appendRoutine = async (req, res) => {

    const {userId, routineId} = req.body

    try{

        const dailyLog = await DailyLog.findOne({ userId, date: { $gte: new Date().setHours(0, 0, 0, 0) } });

        if (!dailyLog) {
            return res.status(404).json({ error: 'Daily log not found' });

        }


    dailyLog.routineLog.push(routineId);
    await dailyLog.save();

    return res.status(200).json(dailyLog);
    } catch (error) {
      console.log(error)
    }


}

export const appendRecipe = async (req, res) => {

    const {userId, recipeId} = req.body

    try{

        const dailyLog = await DailyLog.findOne({ userId, date: { $gte: new Date().setHours(0, 0, 0, 0) } });

        if (!dailyLog) {
            return res.status(404).json({ error: 'Daily log not found' });

        }


    dailyLog.recipeLog.push(recipeId);
    await dailyLog.save();

    return res.status(200).json(dailyLog);
    } catch (error) {
      console.log(error)
    }


}
