import type { Request, Response } from "express";
export declare const UserController: {
    createUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    verifyEmail: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    resendOTP: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=user.controller.d.ts.map