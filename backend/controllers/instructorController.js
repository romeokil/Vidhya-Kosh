import Instructor from "../models/Instructor.js";

//instructor register  

export const register=async(req,res)=>{
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
}

// instructor login

export const login=async(req,res)=>{
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
}

// instructor logout

export const logout=async(req,res)=>{
    return res.status(201).json({
        "message":"Logout Successfully!!"
    })
}

// update instructor

export const update=async(req,res)=>{
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
}