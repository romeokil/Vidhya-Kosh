import express from 'express';
import { register,login,logout,update } from "../controllers/userController.js";
import { singleUpload } from '../middlewares/multer.js';

export const router=express.Router();

router.post('/register',singleUpload,register);
router.post('/login',login);
router.post('/logout',logout);
router.post('/update/:id',singleUpload,update);

export default router;