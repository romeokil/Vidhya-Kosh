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
    },
    role:{
        type:String,
        default:"Instructor"
    },
    profile_picture:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/500px-Unknown_person.jpg"
    },
    publishedcourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Courses'
    }]
},{timestamps:true})

const Instructor=mongoose.model("Instructors",instructorSchema);
export default Instructor;