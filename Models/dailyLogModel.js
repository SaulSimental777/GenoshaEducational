import mongoose from 'mongoose';

const dailyLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date:Date,
        breakfast:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        totalBreakfastCalories:Number,
        totalBreakfastProtein:Number,
        totalBreakfastCarbs:Number,
        lunch:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        totalLunchCalories:Number,
        totalLunchProtein:Number,
        totalLunchCarbs:Number,
        dinner:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        totalDinnerCalories:Number,
        totalDinnerProtein:Number,
        totalDinnerCarbs:Number,
        totalDayCalories:Number,
        totalDayProtein:Number,
        totalDayCarbs:Number,
        routine:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Routine'
        }

    }
);

export default mongoose.model('DailyLog', dailyLogSchema);