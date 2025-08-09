import express from "express";
import { QuestionController } from "./question.controller.js";
import { ENUM_USER_ROLE } from "../../enums/enum.js";
import { isAuth } from "../../middlewares/isAuth.middleware.js";
const router = express.Router();
router.post("/", isAuth(ENUM_USER_ROLE.ADMIN), QuestionController.createQuestion);
router.get("/", QuestionController.getAllQuestions);
router.patch("/:Id", QuestionController.updateQuestion);
router.delete("/:id", QuestionController.deleteQuestion);
router.get("/:id", QuestionController.getQuestionById);
export const QuestionRoutes = router;
//# sourceMappingURL=question.route.js.map