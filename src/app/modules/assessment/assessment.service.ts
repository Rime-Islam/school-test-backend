import ApiError from "../../errors/ApiError.js";
import type { IAssessmentAnswer, IAssessmentResult, IAssessmentSession } from "./assessment.inerface.js";
import httpStatus from 'http-status';
import { AssessmentSession } from "./assessment.model.js";
const createAssessmentSession = async (
  payload: IAssessmentSession
) => {
  const result = await AssessmentSession.create(payload);
  return result;
};

const getAssessmentSessionById = async (
  id: string
) => {
  const result = await AssessmentSession.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment session not found');
  }
  return result;
};

const getAssessmentSessionsByUser = async (
  userId: string
): Promise<IAssessmentSession[]> => {
  const results = await AssessmentSession.find({ userId });
  return results;
};

const updateAssessmentSession = async (
  id: string,
  payload: Partial<IAssessmentSession>
): Promise<IAssessmentSession | null> => {
  const result = await AssessmentSession.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment session not found');
  }
  return result;
};

const deleteAssessmentSession = async (
  id: string
): Promise<IAssessmentSession | null> => {
  const result = await AssessmentSession.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment session not found');
  }
  return result;
};

const addAnswerToSession = async (
  sessionId: string,
  answer: IAssessmentAnswer
): Promise<IAssessmentSession | null> => {
  const result = await AssessmentSession.findByIdAndUpdate(
    sessionId,
    { $push: { answers: answer } },
    { new: true }
  );
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment session not found');
  }
  return result;
};

const completeAssessmentSession = async (
  sessionId: string,
  results: IAssessmentResult[]
) => {
  const result = await AssessmentSession.findByIdAndUpdate(
    sessionId,
    {
      status: 'completed',
      results,
      completedAt: new Date(),
      highestCertifiedLevel: results[results.length - 1]?.certifiedLevel,
    },
    { new: true }
  );
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment session not found');
  }
  return result;
};

export const AssessmentSessionService = {
  createAssessmentSession,
  getAssessmentSessionById,
  getAssessmentSessionsByUser,
  updateAssessmentSession,
  deleteAssessmentSession,
  addAnswerToSession,
  completeAssessmentSession
};