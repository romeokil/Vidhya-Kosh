import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import User from './models/User.js'
const app=express();
dotenv.config();
const PORT=8000;
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.status(201).json({
        "message":"Welcome to the Get request!"
    })
})  
// user Routes

// register route
app.post('/register',async(req,res)=>{
    const {name,password,role}=req.body;
    // check missing credentials.
    if(!name || !password || !role){
        return res.status(401).json({
            "message":"Missing credentials!!"
        })
    }
    // check user is already registered or not
    const registeredUser=await User.findOne({name});
    if(registeredUser){
        return res.status(404).json({
            "message":"You have already registered.."
        })
    }
    // if not then we need to create newUser.
    const newUser=await User.create({
        name,
        password,
        role
    })
    newUser.save();
    return res.status(201).json({
        "message":"Successfully Registered!!",
        newUser
    })

})

// login route
app.post('/login',async(req,res)=>{
    const {name,password,role}=req.body;
        if(!name || !password || !role){
        return res.status(401).json({
            "message":"Missing credentials!!"
        })
    }
    const registeredUser=await User.findOne({name});
    // in case unknown user / unregistered user if try to logged in.
    if(!registeredUser){
        return res.status(401).json({
            "message":"Sorry You need to register First"
        })
    }
    // in case if registered user 
    else{
        // check for password and role match
        let checkpassword=JSON.stringify(password)===JSON.stringify(registeredUser.password);
        if(!checkpassword){
            return res.status(401).json({
                "message":"Sorry Your password is incorrect"
            })
        }
        else{
            // if password is correct then check for role.
            let checkrole=JSON.stringify(role)===JSON.stringify(registeredUser.role);
            if(!checkrole){
                return res.status(401).json({
                    "message":"Sorry you have not registered with this role."
                })
            }
            else{
                return res.status(201).json({
                    "message":"Logged in Successfully!!",
                    registeredUser
                })
            }
        }
    }
})

// logout route 

app.get('/logout',(req,res)=>{
    // at this place with the help of cookie we will check whether user is logged in or not at later stage.
    return res.status(201).json({
        "message":"Logged out Successfully!!"
    })

})

// update user profile

app.post('/update',async(req,res)=>{
    const {name,password,role}=req.body;
    // first check user is logged in or not using jwt we will write at later stage.
    const usertobeUpdated=await User.findOne({name});
    if(!usertobeUpdated){
        return res.status(401).json({
            "message":"Sorry No record find with this name."
        })
    }
    const updatedUser=await usertobeUpdated.updateOne({
        name,
        password,
        role
    })
    return res.status(201).json({
        "message":"User updated Successfully!!",
        updatedUser
    })

})




app.listen(PORT,async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected Successfully!!`)
    }
    catch(error){

    }
    console.log(`Server is running at ${PORT}`);
})