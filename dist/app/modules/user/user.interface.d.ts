import { Model, Types } from "mongoose";
export type IUser = {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "admin" | "student" | "supervisor";
    emailVerified: boolean;
    otp?: {
        code?: string;
        expiresAt?: Date;
    } | null;
};
export type TUserModel = {
    isUserExist(email: string): Promise<Pick<IUser, "email" | "_id" | "name" | "password" | "role" | "emailVerified" | "otp">>;
    isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
    verifyOTP(user: IUser, code: string): Promise<boolean>;
} & Model<IUser>;
//# sourceMappingURL=user.interface.d.ts.map