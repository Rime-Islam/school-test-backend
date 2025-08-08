import express from "express";
import { UserController } from "./user.controller.js";

const router = express.Router();

router.post("/register", UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/refresh-token', UserController.refreshToken);
router.post('/verify-otp', UserController.verifyEmail);
router.post('/logout', UserController.logoutUser);

export const UserRoutes = router;