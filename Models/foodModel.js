import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name:String,
        calories:Number,
        protein:Number,
        carbs:Number,
        fats:Number,
        portionSize:Number

    }


);

export default mongoose.model('Food', foodSchema);