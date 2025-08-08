import { UserService } from "./user.service.js";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
const createUser = catchAsync(async (req, res) => {
    const result = await UserService.createUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: result,
    });
});
const verifyEmail = catchAsync(async (req, res) => {
    const { email, code } = req.body;
    const result = await UserService.verifyEmailOTP(email, code);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Email verification successful",
        data: result.user,
    });
});
const resendOTP = catchAsync(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required'
        });
    }
    const result = await UserService.resendOTPService(email);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "OTP resend successful",
        data: result,
    });
});
export const UserController = {
    createUser,
    verifyEmail,
    resendOTP,
};
//# sourceMappingURL=user.controller.js.map