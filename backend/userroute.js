import express from 'express';
import { userlogin, userregister } from './usercontroller.js';

const router=express.Router();

router.post("/", userregister);
router.post("/login", userlogin);

export default router;