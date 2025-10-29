import mongoose from 'mongoose'

const coursecategorySchema=mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Courses'
    },
    categoryname:{
        type:String,
    },
    categorydescription:{
        type:String
    }
},{timestamps:true})

const courseCategory=mongoose.model("courseCategory",coursecategorySchema);
export default courseCategory;