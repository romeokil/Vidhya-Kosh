import express from 'express'
import { register,login,logout,update } from '../controllers/instructorController.js';

const router=express.Router();
router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.post('/update',update);

export default router;
