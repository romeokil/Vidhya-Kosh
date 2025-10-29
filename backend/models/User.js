import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['User','Instructor','Admin'],
        required:true
    },
    profile_picture:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/500px-Unknown_person.jpg"
    }
},{timestamps:true})

const User=mongoose.model("Users",userSchema);
export default User;