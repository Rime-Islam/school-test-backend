import express from "express";
import { ENUM_USER_ROLE } from "../../enums/enum.js";
import { AssessmentSessionController } from "./assessment.controller.js";
import { isAuth } from "../../middlewares/isAuth.middleware.js";

const router = express.Router();

router.post(
  '/',
  isAuth(ENUM_USER_ROLE.STUDENT),
  AssessmentSessionController.createAssessmentSession
);

router.get(
  '/:id',
  isAuth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.ADMIN),
  AssessmentSessionController.getAssessmentSession
);

router.get(
  '/user/:userId',
  isAuth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.ADMIN),
  AssessmentSessionController.getUserAssessmentSessions
);

router.patch(
  '/:id',
  isAuth(ENUM_USER_ROLE.STUDENT),
  AssessmentSessionController.updateAssessmentSession
);

router.delete(
  '/:id',
  isAuth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.ADMIN),
  AssessmentSessionController.deleteAssessmentSession
);

// Specialized routes
router.post(
  '/:sessionId/answers',
  isAuth(ENUM_USER_ROLE.STUDENT),
  AssessmentSessionController.addAnswer
);

router.post(
  '/:sessionId/complete',
  isAuth(ENUM_USER_ROLE.STUDENT),
  AssessmentSessionController.completeSession
);


export const AssessmentRoutes = router;