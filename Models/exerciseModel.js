import mongoose from 'mongoose';


const exerciseSchema = new mongoose.Schema(
    {
        name:String,
        muscleGroup:String,
        image:String,
        description:String
    }
);

export default mongoose.model('Exercise', exerciseSchema);