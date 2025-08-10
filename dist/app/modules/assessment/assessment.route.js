import express from "express";
import { ENUM_USER_ROLE } from "../../enums/enum.js";
import { AssessmentSessionController } from "./assessment.controller.js";
import { isAuth } from "../../middlewares/isAuth.middleware.js";
const router = express.Router();
router.post('/user', isAuth(ENUM_USER_ROLE.STUDENT), AssessmentSessionController.getUserAssessmentSessions);
router.get('/user', isAuth(ENUM_USER_ROLE.STUDENT), AssessmentSessionController.getUserAssessment);
router.patch('/', isAuth(ENUM_USER_ROLE.STUDENT), AssessmentSessionController.createAssessmentSession);
router.patch('/:id', isAuth(ENUM_USER_ROLE.STUDENT), AssessmentSessionController.updateAssessmentSession);
export const AssessmentRoutes = router;
//# sourceMappingURL=assessment.route.js.map