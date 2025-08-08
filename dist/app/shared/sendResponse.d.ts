import type { Response } from "express";
type IApiResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string | null | undefined;
    meta?: {
        page: number;
        limit: number;
        total: number;
    } | undefined;
    data: T | null;
};
declare const sendResponse: <T>(res: Response, data: IApiResponse<T>) => void;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map