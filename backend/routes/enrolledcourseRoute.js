import express from 'express'
import { checkenrolledCourse,getallenrolledCourse, userenrolledCourse } from '../controllers/enrolledcourseController.js'

const router=express.Router();

router.post('/check/:userId/:courseId',checkenrolledCourse);
router.get('/getuserenrolledcourses/:id',userenrolledCourse);
router.get('/getall',getallenrolledCourse);

export default router;
