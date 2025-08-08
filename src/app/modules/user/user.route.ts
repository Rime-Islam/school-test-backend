import express from "express";
import { UserController } from "./user.controller.js";

const router = express.Router();

router.post("/register", UserController.createUser);
router.post('/verify-otp', UserController.verifyEmail);
router.post('/resend-otp', UserController.resendOTP);


export const UserRoutes = router;