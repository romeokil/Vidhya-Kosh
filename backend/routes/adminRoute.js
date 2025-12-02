import express from 'express';
import { adminlogin, getadminallcourses, getadminallenrolledcourses, getadminallinstructor, getadminallusers} from '../controllers/adminController.js';

const router=express.Router();

router.post('/login',adminlogin);
router.get('/getallusers',getadminallusers);
router.get('/getallcourses',getadminallcourses);
router.get('/getallinstructors',getadminallinstructor);
router.get('/getallenrolledcourses',getadminallenrolledcourses);

export default router;

