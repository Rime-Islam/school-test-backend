import type { NextFunction, Request, Response } from 'express';
export declare const isAuth: (...requiredRoles: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=isAuth.middleware.d.ts.map