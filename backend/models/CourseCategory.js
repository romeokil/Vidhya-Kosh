import mongoose from 'mongoose'

const coursecategorySchema=mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Courses'
    },
    name:{
        type:String,
    },
    description:{
        type:String
    }
},{timestamps:true})

const courseCategory=mongoose.model(coursecategorySchema,"courseCategory");
export default courseCategory;