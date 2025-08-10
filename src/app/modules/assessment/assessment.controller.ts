import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import httpStatus from "http-status";
import type { Request, Response } from "express";
import { AssessmentSessionService } from "./assessment.service.js";
import type { IAssessmentSession } from "./assessment.inerface.js";

const createAssessmentSession = catchAsync(
  async (req: Request, res: Response) => {
      const user = req.user;
    const userId = user?._id;

    const result = await AssessmentSessionService.createAssessmentSession(
      userId, req.body
    );
    sendResponse<IAssessmentSession>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Assessment session created successfully",
      data: result,
    });
  }
);

const getAssessmentSession = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AssessmentSessionService.getAssessmentSessionById(
    id as string
  );
  sendResponse<IAssessmentSession>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Assessment session retrieved successfully",
    data: result,
  });
});

const getUserAssessmentSessions = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const userId = user?._id;
    const results = await AssessmentSessionService.getAssessmentSessionsByUser(
      userId as string
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User assessment sessions retrieved successfully",
      data: results,
    });
  }
);

const getUserAssessment = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const userId = user?._id;
    const results = await AssessmentSessionService.getAssessmentByUser(
      userId as string
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User assessment sessions retrieved successfully",
      data: results,
    });
  }
);

const updateAssessmentSession = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const results = await AssessmentSessionService.updateAssessmentSession(
      id as string
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Assessment session updated successfully",
      data: results,
    });
  }
);


export const AssessmentSessionController = {
  createAssessmentSession,
  getAssessmentSession,
  getUserAssessmentSessions,
  updateAssessmentSession,
  getUserAssessment
};
