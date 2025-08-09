import type { IUser } from "./user.interface.js";
export declare const UserService: {
    createUser: (payload: IUser) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    verifyEmailOTP: (email: string, code: string) => Promise<{
        user: import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    resendOTPService: (email: string) => Promise<{
        otp: {
            code: string;
            expiresAt: Date;
        };
    }>;
};
//# sourceMappingURL=user.service.d.ts.map