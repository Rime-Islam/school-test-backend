import type { Request, Response } from "express";
export declare const AuthController: {
    loginUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    logoutUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    refreshToken: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    forgotPassword: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    resetPassword: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    changePassword: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=auth.controller.d.ts.map