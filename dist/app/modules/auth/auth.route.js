import express from "express";
import { AuthController } from "./auth.controller.js";
import { isAuth } from "../../middlewares/isAuth.middleware.js";
import { ENUM_USER_ROLE } from "../../enums/enum.js";
const router = express.Router();
router.post("/login", AuthController.loginUser);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logoutUser);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.put("/change-password", isAuth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.SUPERVISOR), AuthController.changePassword);
export const AuthRoutes = router;
//# sourceMappingURL=auth.route.js.map