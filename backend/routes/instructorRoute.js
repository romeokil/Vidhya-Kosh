import express from 'express'
import { register,login,logout,update } from '../controllers/instructorController.js';
import {singleUpload} from '../middlewares/multer.js'
const router=express.Router();
router.post('/register',singleUpload,register);
router.post('/login',login);
router.post('/logout',logout);
router.post('/update/:id',singleUpload,update);

export default router;
