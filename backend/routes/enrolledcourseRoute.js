import express from 'express'
import { checkenrolledCourse,getallenrolledCourse } from '../controllers/enrolledcourseController.js'

const router=express.Router();

router.post('/check/:userId/:courseId',checkenrolledCourse);
router.get('/getall',getallenrolledCourse);

export default router;
