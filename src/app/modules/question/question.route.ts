import express from "express";
import { QuestionController } from "./question.controller.js";


const router = express.Router();

router.post("/", QuestionController.createQuestion);
router.get("/", QuestionController.getAllQuestions);
router.patch("/:Id", QuestionController.updateQuestion);
router.delete("/:id", QuestionController.deleteQuestion);


export const QuestionRoutes = router;