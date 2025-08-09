import type { Request, Response } from "express";
export declare const QuestionController: {
    createQuestion: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllQuestions: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateQuestion: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteQuestion: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getQuestionById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=question.controller.d.ts.map