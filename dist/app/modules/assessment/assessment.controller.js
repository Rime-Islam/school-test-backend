import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import httpStatus from "http-status";
import { AssessmentSessionService } from "./assessment.service.js";
const createAssessmentSession = catchAsync(async (req, res) => {
    const user = req.user;
    const userId = user?._id;
    const result = await AssessmentSessionService.createAssessmentSession(userId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Assessment session created successfully",
        data: result,
    });
});
const getAssessmentSession = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AssessmentSessionService.getAssessmentSessionById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Assessment session retrieved successfully",
        data: result,
    });
});
const getUserAssessmentSessions = catchAsync(async (req, res) => {
    const user = req.user;
    const userId = user?._id;
    const results = await AssessmentSessionService.getAssessmentSessionsByUser(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User assessment sessions retrieved successfully",
        data: results,
    });
});
const getUserAssessment = catchAsync(async (req, res) => {
    const user = req.user;
    const userId = user?._id;
    const results = await AssessmentSessionService.getAssessmentByUser(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User assessment sessions retrieved successfully",
        data: results,
    });
});
const updateAssessmentSession = catchAsync(async (req, res) => {
    const { id } = req.params;
    const results = await AssessmentSessionService.updateAssessmentSession(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Assessment session updated successfully",
        data: results,
    });
});
export const AssessmentSessionController = {
    createAssessmentSession,
    getAssessmentSession,
    getUserAssessmentSessions,
    updateAssessmentSession,
    getUserAssessment
};
//# sourceMappingURL=assessment.controller.js.map