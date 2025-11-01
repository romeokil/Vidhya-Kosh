import express from 'express'
import { register,update,getallcourse,deletecourse } from '../controllers/courseController.js'
const router=express.Router();

router.post('/register',register);
router.get('/getallcourse',getallcourse);
router.put('/update/:courseId',update);
router.delete('/delete/:courseId',deletecourse);

export default router;