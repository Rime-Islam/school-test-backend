import express from "express";
import { ENUM_USER_ROLE } from "../../enums/enum.js";
import { AssessmentSessionController } from "./assessment.controller.js";
import { isAuth } from "../../middlewares/isAuth.middleware.js";

const router = express.Router();

router.patch(
  '/',
  isAuth(ENUM_USER_ROLE.STUDENT),
  AssessmentSessionController.createAssessmentSession
);

router.post(
  '/user',
  isAuth(ENUM_USER_ROLE.STUDENT),
  AssessmentSessionController.getUserAssessmentSessions
);

router.get(
  '/user',
  isAuth(ENUM_USER_ROLE.STUDENT),
  AssessmentSessionController.getUserAssessment
);

// router.get(
//   '/:id',
//   isAuth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.ADMIN),
//   AssessmentSessionController.getAssessmentSession
// );

// router.patch(
//   '/:id',
//   isAuth(ENUM_USER_ROLE.STUDENT),
//   AssessmentSessionController.updateAssessmentSession
// );

// router.delete(
//   '/:id',
//   isAuth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.ADMIN),
//   AssessmentSessionController.deleteAssessmentSession
// );

// router.post(
//   '/:sessionId/answers',
//   isAuth(ENUM_USER_ROLE.STUDENT),
//   AssessmentSessionController.addAnswer
// );

// router.post(
//   '/:sessionId/complete',
//   isAuth(ENUM_USER_ROLE.STUDENT),
//   AssessmentSessionController.completeSession
// );


export const AssessmentRoutes = router;