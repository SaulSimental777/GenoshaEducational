import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        Id:String,
        name:String,
        ingredients:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            quantity: Number
        }],
        description:String,
        createdBy: String,
        totalCalories:{ type: Number, default: 0 },
        totalProtein:{ type: Number, default: 0 },
        totalCarbs:{ type: Number, default: 0 },
        totalFats:{ type: Number, default: 0 },
    }
);

export default mongoose.model('Recipe', recipeSchema);