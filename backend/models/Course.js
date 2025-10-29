import mongoose from 'mongoose';

const courseSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Course=mongoose.model("Courses",courseSchema);
export default Course;