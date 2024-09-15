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
        lunch:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        dinner:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        routine:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Routine'
        }

    }
);

export default mongoose.model('DailyLog', dailyLogSchema);