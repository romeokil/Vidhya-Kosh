import express from 'express';
import { register,login,logout,update } from "../controllers/userController.js";

export const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.post('/update/:id',update);

export default router;