import ApiError from "../../errors/ApiError.js";
import type {
  IAssessmentAnswer,
  IAssessmentResult,
  IAssessmentSession,
} from "./assessment.inerface.js";
import httpStatus from "http-status";
import { AssessmentSession } from "./assessment.model.js";

const createAssessmentSession = async (userId: string, payload: IAssessmentAnswer) => {
const session = await AssessmentSession.findOne({ userId });

const sessionId = session?._id;
const result = await AssessmentSession.findByIdAndUpdate(
  sessionId,
  { $push: { answers: { $each: payload } } },
  { new: true }
);
return result;
};

const getAssessmentSessionById = async (id: string) => {
  const result = await AssessmentSession.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Assessment session not found");
  }
  return result;
};

const getAssessmentSessionsByUser = async (userId: string) => {
  const results = await AssessmentSession.find({ userId: userId });

  if (!results || results.length === 0) {
    const newSession = new AssessmentSession({
      userId: userId,
      highestCertifiedLevels: ["A1", "A2"],
      currentStep: 1,
    });

    await newSession.save();
    return [newSession];
  }

  return results;
};

const getAssessmentByUser = async (userId: string) => {
  const results = await AssessmentSession.find({ userId: userId });

  if (!results || results.length === 0) {
   throw new ApiError(httpStatus.NOT_FOUND, "Assessment session not found");
  }

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
    throw new ApiError(httpStatus.NOT_FOUND, "Assessment session not found");
  }
  return result;
};

const deleteAssessmentSession = async (
  id: string
): Promise<IAssessmentSession | null> => {
  const result = await AssessmentSession.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Assessment session not found");
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
    throw new ApiError(httpStatus.NOT_FOUND, "Assessment session not found");
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
      status: "completed",
      results,
      completedAt: new Date(),
      highestCertifiedLevel: results[results.length - 1]?.certifiedLevel,
    },
    { new: true }
  );
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Assessment session not found");
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
  completeAssessmentSession,
  getAssessmentByUser,
};
