import { model, Schema, Types } from "mongoose";
import type { IQuestion, TQuestionModel } from "./question.interface.js";

const OptionsSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const QuestionSchema = new Schema<IQuestion, TQuestionModel>(
  {
    createdBy: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    options: {
      type: [OptionsSchema],
      required: true,
      default: [],
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    competency: {
      type: String,
      enum: ["grammar", "vocabulary", "writing"],
      default: "grammar",
    },
    level: {
      type: String,
      required: true,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
    },
    timeLimit: {
      type: Number,
      default: 60,
    },
  },
  { timestamps: true }
);

export const Question = model<IQuestion, TQuestionModel>(
  "Question",
  QuestionSchema
);
