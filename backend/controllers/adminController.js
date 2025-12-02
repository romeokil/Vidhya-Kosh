// admin login controller function 

import Course from "../models/Course.js";
import Instructor from "../models/Instructor.js";
import User from "../models/User.js";
import AllEnrolledCourses from "../models/EnrolledCourses.js"

export const adminlogin=async(req,res)=>{
    const {name,password,role}=req.body;

    // check admin credentials is missing;
    if(!name || !password || !role){
        return res.status(401).json({
            "message":"Sorry missing credentials"
        })
    }
    const newname=req.body?.name.toLowerCase();
    const newpassword=req.body?.password.toLowerCase();
    const newrole=req.body?.role.toLowerCase();

    if(newname==='rahul' || newpassword==='rahul' ||  newrole==='admin'){
        return res.status(201).json({
            "message":"Admin Logged In Successfully!!",
        })
    }
}

export const getadminallcourses=async(req,res)=>{
    const allcourses=await Course.find({});
    if(!allcourses || allcourses.length==0){
        return res.status(401).json({
            "message":"Sorry no registered course yet!!"
        })
    }
    return res.status(201).json({
        "message":"All courses Retrieved Successfully!",
        allcourses
    })
}

export const getadminallusers=async(req,res)=>{
    const allusers=await User.find({});
    if(!allusers ||  allusers.length==0){
        return res.status(401).json({
            "message":"Sorry No Users are there."
        })
    }
    return res.status(201).json({
        "message":"All users Retrieved Successfully!!",
        allusers
    })
}

export const getadminallinstructor=async(req,res)=>{
    const allinstructors=await Instructor.find({});
    if(!allinstructors || allinstructors.length===0){
        return res.status(401).json({
            "message":"Sorry No Instructors found!!"
        })
    }
    return res.status(201).json({
        "message":"All instructor Retrieved Successfully!",
        allinstructors
    })
}

export const getadminallenrolledcourses=async(req,res)=>{
    const allenrolledcourses=await AllEnrolledCourses.find({}).populate('course').populate('user');
    if(!allenrolledcourses || allenrolledcourses.length===0){
        return res.status(401).json({
            "message":"No enrolled Courses Found!!"
        })
    }
    return res.status(201).json({
        "message":"All enrolled courses retrived!!",
        allenrolledcourses
    })
}