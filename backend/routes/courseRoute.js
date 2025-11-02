import express from 'express'
import { register,update,getallcourse,deletecourse, getcoursebyid } from '../controllers/courseController.js'
const router=express.Router();

router.post('/register',register);
router.get('/getcoursebyid/:courseId',getcoursebyid)
router.get('/getallcourse',getallcourse);
router.put('/update/:courseId',update);
router.delete('/delete/:courseId',deletecourse);

export default router;