import mongoose from 'mongoose'

const instructorSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Instructor=mongoose.model("Instructors",instructorSchema);
export default Instructor;