import mongoose from "mongoose";

const routineSchema = new mongoose.Schema(
    {
        name:String,
        exercises:[{
            exercise:{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'},
            sets: Number,
            reps: Number
        }]

    }
);

export default mongoose.model('Routine', routineSchema);