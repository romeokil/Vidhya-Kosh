import express from 'express'
import { register,update,getallcourse,deletecourse } from '../controllers/courseController'

const router=express.Router();

router.post('/register',register);
router.get('/getallcourse',getallcourse);
router.put('/update',update);
router.delete('/delete',deletecourse);

export default router;