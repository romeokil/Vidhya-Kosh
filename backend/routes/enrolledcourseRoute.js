import express from 'express'
import { checkenrolledCourse,getallenrolledCourse, userenrolledCourse } from '../controllers/enrolledcourseController.js'
import verifyToken from '../middlewares/verifyToken.js';
const router=express.Router();

router.post('/check/:userId/:courseId',verifyToken,checkenrolledCourse);
router.get('/getuserenrolledcourses/:id',userenrolledCourse);
router.get('/getall',getallenrolledCourse);

export default router;
