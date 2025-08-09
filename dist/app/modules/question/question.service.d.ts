import type { IQuestion, IQuestionFilter } from "./question.interface.js";
export declare const QuestionService: {
    createQuestion: (payload: IQuestion, id: string) => Promise<{
        question: import("mongoose").Document<unknown, {}, IQuestion, {}, {}> & IQuestion & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    getAllQuestions: (filters: IQuestionFilter, options: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
        };
        data: (import("mongoose").Document<unknown, {}, IQuestion, {}, {}> & IQuestion & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    updateQuestion: (id: string, payload: Partial<IQuestion>) => Promise<import("mongoose").Document<unknown, {}, IQuestion, {}, {}> & IQuestion & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteQuestion: (id: string) => Promise<import("mongoose").Document<unknown, {}, IQuestion, {}, {}> & IQuestion & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getQuestionById: (id: string) => Promise<import("mongoose").Document<unknown, {}, IQuestion, {}, {}> & IQuestion & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
};
//# sourceMappingURL=question.service.d.ts.map