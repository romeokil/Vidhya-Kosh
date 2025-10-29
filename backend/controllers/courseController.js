import Course from "../models/Course.js";

// register course

export const register=async(req,res)=>{
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
}

// get all course

export const getallcourse=async(req,res)=>{
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
}

// update course

export const update=async(req,res)=>{
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
}

export const deletecourse=async(req,res)=>{
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
}
