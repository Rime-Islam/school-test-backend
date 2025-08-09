import { Schema, model } from 'mongoose';
import type { IAssessmentSession } from './assessment.inerface.js';

const AssessmentAnswerSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, required: true },
  selectedAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  timeSpent: { type: Number, required: true }, // in seconds
  timestamp: { type: Date, default: Date.now },
});

const AssessmentResultSchema = new Schema({
  step: { type: Number, enum: [1, 2, 3], required: true },
  score: { type: Number, required: true },
  certifiedLevel: { type: String, enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
});

const AssessmentSessionSchema = new Schema<IAssessmentSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    currentStep: { type: Number, enum: [1, 2, 3], default: 1 },
    status: {
      type: String,
      enum: ['in-progress', 'completed', 'abandoned'],
      default: 'in-progress',
    },
    answers: [AssessmentAnswerSchema],
    results: [AssessmentResultSchema],
    highestCertifiedLevel: {
      type: String,
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AssessmentSession = model<IAssessmentSession>(
  'AssessmentSession',
  AssessmentSessionSchema
);