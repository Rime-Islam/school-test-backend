import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync.js";
import { QuestionService } from "./question.service.js";
import sendResponse from "../../shared/sendResponse.js";
import pick from "../../shared/pick.js";
import { paginationFields } from "../../constants/paginationConst.js";
import type { Request, Response } from "express";

const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const id = user?._id;

  const result = await QuestionService.createQuestion(req.body, id as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Question created successfully",
    data: result.question,
  });
});

const getAllQuestions = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["competency", "level"]);
  const options = pick(req.query, paginationFields);

  const result = await QuestionService.getAllQuestions(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Questions retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getQuestionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const question = await QuestionService.getQuestionById(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question retrieved successfully",
    data: question,
  });
});

const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const { Id } = req.params;

  const updatedData = req.body.data;
  const result = await QuestionService.updateQuestion(
    Id as string,
    updatedData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question updated successfully",
    data: result,
  });
});

const deleteQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await QuestionService.deleteQuestion(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question deleted successfully",
    data: result,
  });
});

export const QuestionController = {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  getQuestionById,
};
