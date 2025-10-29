import express from 'express'
import { checkenrolledCourse,getallenrolledCourse,getcoursebyid } from '../controllers/enrolledcourseController.js'

const router=express.Router();

router.post('/check',checkenrolledCourse);
router.get('/getall',getallenrolledCourse);
router.post('/getbyid',getcoursebyid);

export default router;
