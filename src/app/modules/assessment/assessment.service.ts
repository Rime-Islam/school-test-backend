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
  const results = await  AssessmentSession
  .find({ userId: userId })
  .populate("userId", "name email");

  if (!results || results.length === 0) {
   throw new ApiError(httpStatus.NOT_FOUND, "Assessment session not found");
  }

  return results;
};

const updateAssessmentSession = async (id: string) => {
  const session = await AssessmentSession.findOne({ _id: id });

  if (!session) {
    throw new ApiError(httpStatus.NOT_FOUND, "Assessment session not found");
  }
  if (!session.answers || session.answers.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No answers found in assessment");
  }

  const totalQuestions = session.answers.length;
  const correctAnswers = session.answers.filter(answer => answer.isCorrect).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  let result: IAssessmentResult = {
    step: session.currentStep,
    score: percentage,
  };

  switch (session.currentStep) {
    case 1:
      if (percentage < 25) {
        result.certifiedLevel = '0';
      } else if (percentage < 50) {
        result.certifiedLevel = 'A1';
      } else if (percentage < 75) {
        result.certifiedLevel = 'A2';
      } else {
        result.certifiedLevel = 'A2';
        session.currentStep = 2;
        session.highestCertifiedLevels = ["B1", "B2"]
      }
      break;

    case 2:
      if (percentage < 25) {
        result.certifiedLevel = "0";
      } else if (percentage < 50) {
        result.certifiedLevel = 'B1';
      } else if (percentage < 75) {
        result.certifiedLevel = 'B2';
      } else {
        result.certifiedLevel = 'B2';
        session.currentStep = 3;
        session.highestCertifiedLevels = ["C1", "C2"]
      }
      break;

    case 3:
      if (percentage < 25) {
        result.certifiedLevel = "0";
      } else if (percentage < 50) {
        result.certifiedLevel = 'C1';
      } else {
        result.certifiedLevel = 'C2';
      }
      break;

    default:
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid current step");
  }

  session.results = session.results || [];
  session.results.push(result);
  session.answers = [];

if (percentage < 25) {
  session.status = 'abandoned';
} else if (percentage >= 25 && percentage < 75) {
  session.status = 'completed';
} else if (percentage >= 75) {
  session.status = 'proceed';
} else {
  session.status = 'in-progress';
}

  await session.save();

  return session;
};


export const AssessmentSessionService = {
  createAssessmentSession,
  getAssessmentSessionById,
  getAssessmentSessionsByUser,
  updateAssessmentSession,
  getAssessmentByUser,
};
