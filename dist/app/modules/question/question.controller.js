import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync.js";
import { QuestionService } from "./question.service.js";
import sendResponse from "../../shared/sendResponse.js";
import pick from "../../shared/pick.js";
import { paginationFields } from "../../constants/paginationConst.js";
const createQuestion = catchAsync(async (req, res) => {
    const user = req.user;
    const id = user?._id;
    const result = await QuestionService.createQuestion(req.body, id);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Question created successfully",
        data: result.question,
    });
});
const getAllQuestions = catchAsync(async (req, res) => {
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
const getQuestionById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const question = await QuestionService.getQuestionById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Question retrieved successfully",
        data: question,
    });
});
const updateQuestion = catchAsync(async (req, res) => {
    const { Id } = req.params;
    const updatedData = req.body.data;
    const result = await QuestionService.updateQuestion(Id, updatedData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Question updated successfully",
        data: result,
    });
});
const deleteQuestion = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await QuestionService.deleteQuestion(id);
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
//# sourceMappingURL=question.controller.js.map