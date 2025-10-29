import enrolledCourse from "../models/EnrolledCourses.js";

// checkenrolledCourse controller

export const checkenrolledCourse = async (req, res) => {
    const { name, course } = req.body;
    const allenrolledCourse = await enrolledCourse.find({ name });
    const checkenrolledcourse = allenrolledCourse.map((enrollcourse) => {
        return JSON.stringify(enrollcourse.toLowerCase()) === JSON.stringify(course.toLowerCase())
    })
    if (checkenrolledcourse) {
        return res.status(401).json({
            "message": "Sorry you have already enrolled for this Course"
        })
    }
    else {
        const date = new Date();
        let newenroll = await enrolledCourse.create({
            name,
            course,
            enrolledAt: date.toLocaleDateString()
        })
        newenroll.save();
        return res.status(201).json({
            "message": "Congrats You have enrolled for this course",
            newenroll
        })
    }
}

// get all enrolled Course

export const getallenrolledCourse = async (req, res) => {
    const getallenrolledCourse = await enrolledCourse.find({});
    return res.status(201).json({
        "message": "All enrolled courses retrived!!",
        getallenrolledCourse
    })
}

// get course by id (individual course).

export const getcoursebyid = async (req, res) => {
    const { name } = req.body;
    const getenrolledCourse = await enrolledCourse.find({ name });
    return res.status(201).json({
        "message": "You have enrolled for this courses",
        getenrolledCourse
    })
}