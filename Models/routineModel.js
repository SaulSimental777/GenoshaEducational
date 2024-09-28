import mongoose from "mongoose";

const routineSchema = new mongoose.Schema(
    {
        Id:String,
        name:String,
        exercises:[{
            exercise:{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'},
            sets: Number,
            reps: Number
        }],
        createdBy: String

    }
);

export default mongoose.model('Routine', routineSchema);