import mongoose from 'mongoose'

const enrolledcoursesSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'courses'
    },
    enrolledAt:{
        type:String
    }
},{timestamps:true});

const enrolledCourse=mongoose.model("enrolledCourses",enrolledcoursesSchema);
export default enrolledCourse;