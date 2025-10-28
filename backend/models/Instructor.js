import mongoose from 'mongoose'

const instructorSchema=mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
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

const Instructor=mongoose.model(instructorSchema,"Instructors");
export default Instructor;