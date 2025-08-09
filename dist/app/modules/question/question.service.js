import ApiError from "../../errors/ApiError.js";
import { paginationHelper } from "../../helpers/paginationHelper.js";
import { Question } from "./question.model.js";
import httpStatus from "http-status";
const createQuestion = async (payload, id) => {
    if (!payload.options || payload.options.length < 2) {
        throw new ApiError(httpStatus.BAD_REQUEST, "At least two options are required.");
    }
    const correctCount = payload.options.filter(opt => opt.isCorrect).length;
    if (correctCount !== 1) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Exactly one option must be marked as correct.");
    }
    const correctOption = payload.options.find(opt => opt.isCorrect);
    if (!correctOption) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Correct answer could not be determined.");
    }
    payload.correctAnswer = correctOption.text;
    payload.createdBy = id;
    const question = await Question.create(payload);
    return { question };
};
const getAllQuestions = async (filters, options) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
    const query = {};
    if (filters.competency) {
        query.competency = filters.competency;
    }
    if (filters.level) {
        query.level = filters.level;
    }
    const questions = await Question.find(query)
        .sort({ [sortBy]: sortOrder })
        .populate('createdBy')
        .skip(skip)
        .limit(limit);
    const total = await Question.countDocuments(query);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: questions,
    };
};
const updateQuestion = async (id, payload) => {
    if (!payload.options || payload.options.length < 2) {
        throw new ApiError(httpStatus.BAD_REQUEST, "At least two options are required.");
    }
    const correctCount = payload.options.filter(opt => opt.isCorrect).length;
    if (correctCount !== 1) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Exactly one option must be marked as correct.");
    }
    const correctOption = payload.options.find(opt => opt.isCorrect);
    if (!correctOption) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Correct answer could not be determined.");
    }
    payload.correctAnswer = correctOption.text;
    const question = await Question.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
        runValidators: true,
    });
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    return question;
};
const deleteQuestion = async (id) => {
    const question = await Question.findByIdAndDelete({ _id: id });
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    return question;
};
const getQuestionById = async (id) => {
    const question = await Question.findById(id);
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    return question;
};
export const QuestionService = {
    createQuestion,
    getAllQuestions,
    updateQuestion,
    deleteQuestion,
    getQuestionById,
};
//# sourceMappingURL=question.service.js.map