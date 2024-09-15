import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        name:String,
        ingredients:[{
            food:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'Food'
            },
            quantity: Number
        }],
        totalCalories:Number,
        totalProteins:Number,
        totalFats:Number,
        totalCarbs:Number,
        description:String,
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }
);

export default mongoose.model('Recipe', recipeSchema);