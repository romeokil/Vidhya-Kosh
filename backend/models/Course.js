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
    },
    rating:{
        type:Number,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Instructors',
        required:true
    }
},{timestamps:true})

courseSchema.index({ name: 1, author: 1 }, { unique: true });

const Course=mongoose.model("Courses",courseSchema);
export default Course;