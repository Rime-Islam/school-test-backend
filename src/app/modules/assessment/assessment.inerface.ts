import { Model, Types } from "mongoose";

export interface IAssessmentAnswer {
  questionId: Types.ObjectId;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
  timestamp: Date;
}

export interface IAssessmentResult {
  step: 1 | 2 | 3;
  score: number;
  certifiedLevel?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
}

export interface IAssessmentSession {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  currentStep: 1 | 2 | 3;
  status: "in-progress" | "completed" | "abandoned";
  answers: IAssessmentAnswer[];
  results?: IAssessmentResult[];
  highestCertifiedLevel?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  startedAt: Date;
  completedAt?: Date;
}

export type AssessmentSessionModel = Model<IAssessmentSession>;
