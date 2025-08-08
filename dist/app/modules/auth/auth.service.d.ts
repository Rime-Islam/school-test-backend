import type { IUser } from "../user/user.interface.js";
export declare const AuthService: {
    loginUser: (payload: Pick<IUser, "email" | "password">) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            _id: string;
            name: string;
            email: string;
            role: "admin" | "student" | "supervisor";
        };
    }>;
    refreshToken: (token: string) => Promise<{
        accessToken: string;
    }>;
    forgetPassword: (email: string) => Promise<{
        _id: string;
        email: string;
    }>;
    resetPassword: (token: string, userId: string, newPassword: string) => Promise<{
        _id: string;
        email: string;
    }>;
    changePassword: (email: string, currentPassword: string, newPassword: string) => Promise<{
        updatedUser: import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
            _id: string;
        }> & {
            __v: number;
        };
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map