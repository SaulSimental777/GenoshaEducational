import mongoose from "mongoose";
import { GOAL_CATEGORY } from "../Utils/Constants";

const userSchema = new mongoose.Schema(
    {
        name:String,
        lastName:String,
        email:String,
        password:String,
        age: Number,
        weight:Number,
        height:Number,
        goal: {
            type:String,
            enum:Object.values(GOAL_CATEGORY),
            default: GOAL_CATEGORY.LOSE
        },
        bodyFatPercentage: Number,
        leanMass:Number,
        routines:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Routine'
        }],
        recipes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        role:{
            type:String,
            enum:['user', 'admin'],
            default:'user',
        }


    }
)

userSchema.methods.toJSON = function(){
    let obj = this.toObject()
    delete obj.password
    return obj;
}

export default mongoose.model('User', userSchema);