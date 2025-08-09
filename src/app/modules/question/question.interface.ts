import { Model, Types, type ObjectId } from "mongoose";

export interface IQuestion {
  _id: Types.ObjectId;
  createdBy: ObjectId | string; 
  text: string; 
  options: {
    text: string; 
    isCorrect: boolean; 
  }[];
  correctAnswer: string; 
  competency: "grammar" | "vocabulary" | "writing";
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  timeLimit: number;
}

export interface IQuestionFilter {
  competency?: string;
  level?: string;
}

export type TQuestionModel = Model<IQuestion>;