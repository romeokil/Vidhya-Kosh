import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import User from './models/User.js'
import Instructor from './models/Instructor.js';
import Course from './models/Course.js';
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
    await updatedUser.save();
    return res.status(201).json({
        "message":"User updated Successfully!!",
        updatedUser
    })

})


// instructor routes.

//register Instructor

app.post('/registerInstructor',async(req,res)=>{
    const {name,password,bio,rating}=req.body;
    if(!name || !password || !bio || !rating){
        return res.status(401).json({
            "message":"Sorry Missing credentials"
        })
    }
    const alreadyregistered=await Instructor.findOne({name});
    if(alreadyregistered){
        return res.status(401).json({
            "message":"You have already registered!!"
        })
    }
    const newInstructor=await Instructor.create({
        name,
        password,
        bio,
        rating
    })
    newInstructor.save();
    return res.status(201).json({
        "message":"Instructor Registered Successfully!!",
        newInstructor
    })
})

// login Instructor

app.post('/loginInstructor',async(req,res)=>{
    const {name,password}=req.body;
    if(!name || !password || !bio || !rating){
        return res.status(401).json({
            "message":"Sorry Missing credentials!!",
        })
    }
    // checked registered user
    const registeredUser=await Instructor.findOne({name});
    if(!registeredUser){
        return res.status(401).json({
            "message":"Sorry No Instructor registered with this name"
        })
    }
    else{
        // agr registered user hai toh check for other credentials.
        const checkpassword=JSON.stringify(registeredUser.password)===JSON.stringify(password);
        if(!checkpassword){
            return res.status(401).json({
                "message":"Sorry But password is wrong"
            })
        }
        else{
            return res.status(201).json({
                "message":"Logged in successfully!!",
                registeredUser
            })
        }
    }
})


// logout Instructor

app.get('/logoutInstructor',(req,res)=>{
    return res.status(201).json({
        "message":"Logout Successfully!!"
    })
})

// update Instructor

app.post('/updateInstructor',async(req,res)=>{
    const {name,password,bio,rating}=req.body;
    const findInstructor=await Instructor.findOne({name});
    if(!findInstructor){
        return res.status(201).json({
            "message":"Couldn't able to find Instructor"
        })
    }
    const updateInstructor=await findInstructor.updateOne({
        name,
        password,
        bio,
        rating
    })
    await updateInstructor.save();
    return res.status(201).json({
        "message":"Instructor Updated Successfully!!",
        updateInstructor
    })
})

// Course routes

// register Course

app.post('/registerCourse',async(req,res)=>{
    const {name,description,price}=req.body;
    if(!name || !description || !price){
        return res.status(201).json({
            "message":"Sorry Missing credentials!!"
        })
    }
    const alreadyregisteredCourse=await Course.findOne({name});
    if(alreadyregisteredCourse){
        return res.status(201).json({
            "message":"Course with this name is already registered!!"
        })
    }
    else{
        const registerCourse=await Course.create({
            name,
            description,
            price
        })
        registerCourse.save();
        return res.status(201).json({
            "message":"Course Successfully Registered!!"
        })
    }
})

// get all courses.

app.get('/getallCourses',async(req,res)=>{
    const getallCourses=await Course.find({});
    if(!getallCourses){
        return res.status(401).json({
            "message":"Sorry Till now No course Registered!!"
        })
    }
    else{
        return res.status(201).json({
            "message":"All Courses retrieved!!",
            getallCourses
        })
    }
})

// update course

app.post('/updateCourse',async(req,res)=>{
    const {name,description,price}=req.body;

    const isCourse=await Course.findOne({name});
    if(!isCourse){
        return res.status(401).json({
            "message":"Sorry No course with this name"
        })
    }
    else{
        const updatedCourse=isCourse.updateOne({
            name,
            description,
            price
        })
        await updatedCourse.save();
        return res.status(201).json({
            "message":"Course updated Successfully!!"
        })
    }
})

app.post('/deleteCourse',async(req,res)=>{
    const {name}=req.body;
    const newname=name.toLowerCase();
    const isCourse=await Course.findOne({newname});
    if(!isCourse){
        return res.status(401).json({
            "message":"Sorry Can't delete the record with this name"
        })
    }
    else{
        await isCourse.deleteOne();
        res.status(201).json({
            "message":"Course successfully Deleted!!"
        })
    }
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