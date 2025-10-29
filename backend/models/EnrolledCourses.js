import mongoose from 'mongoose'

const enrolledcoursesSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Courses'
    },
    enrolledAt:{
        type:Date
    }
},{timestamps:true});

const enrolledCourse=mongoose.model("enrolledCourses",enrolledcoursesSchema);
export default enrolledCourse;