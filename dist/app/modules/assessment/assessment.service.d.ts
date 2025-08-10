import type { IAssessmentAnswer, IAssessmentSession } from "./assessment.inerface.js";
export declare const AssessmentSessionService: {
    createAssessmentSession: (userId: string, payload: IAssessmentAnswer) => Promise<(import("mongoose").Document<unknown, {}, IAssessmentSession, {}, {}> & IAssessmentSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getAssessmentSessionById: (id: string) => Promise<import("mongoose").Document<unknown, {}, IAssessmentSession, {}, {}> & IAssessmentSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAssessmentSessionsByUser: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, IAssessmentSession, {}, {}> & IAssessmentSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    updateAssessmentSession: (id: string) => Promise<import("mongoose").Document<unknown, {}, IAssessmentSession, {}, {}> & IAssessmentSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAssessmentByUser: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, IAssessmentSession, {}, {}> & IAssessmentSession & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
};
//# sourceMappingURL=assessment.service.d.ts.map