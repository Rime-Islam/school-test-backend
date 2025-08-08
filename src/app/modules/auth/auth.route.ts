import express from "express";
import { AuthController } from "./auth.controller.js";

const router = express.Router();


router.post('/login', AuthController.loginUser);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', AuthController.logoutUser);
router.post('/forgot-password',AuthController.forgotPassword);
router.post('/reset-password',AuthController.resetPassword);
router.put('/change-password',AuthController.changePassword);

export const AuthRoutes = router;