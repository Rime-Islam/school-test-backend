import type { NextFunction, RequestHandler, Request, Response } from "express";
declare const catchAsync: (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default catchAsync;
//# sourceMappingURL=catchAsync.d.ts.map