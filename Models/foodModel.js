import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name:String,
        calories:Number,
        protein:Number,
        carbs:Number,
        fats:Number,
        portionSize:Number,
        image:String,

    }


);

export default mongoose.model('Food', foodSchema);