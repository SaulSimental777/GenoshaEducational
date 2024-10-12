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
        createdBy: String
    }
);

export default mongoose.model('Recipe', recipeSchema);