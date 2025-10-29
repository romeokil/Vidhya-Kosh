import enrolledCourse from "../models/EnrolledCourses.js";

// checkenrolledCourse controller

export const checkenrolledCourse = async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.params.userId;
    console.log("courseId", courseId);
    console.log("userId", userId);
    const getallenrolledCourse = await enrolledCourse.find({});
    console.log(getallenrolledCourse);
    let alreadyEnrolled = getallenrolledCourse.map((enrolledCourse) => {
        return enrolledCourse.user.toString() === userId && enrolledCourse.course.toString() === courseId;
    })
    console.log("alreadyEnrolled",alreadyEnrolled);
    let checkEnrollment=false;
    alreadyEnrolled.map((item)=>{
        if(item===true) checkEnrollment=true;
    })
    if (checkEnrollment) {
        return res.status(201).json({
            "message": "You have already enrolled for this course!!"
        })
    } else {
        const date = new Date();
        let newenroll = await enrolledCourse.create({
            user: userId,
            course: courseId,
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
