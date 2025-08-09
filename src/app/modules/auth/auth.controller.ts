import config from "../../config/index.js";
import type { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthService } from "./auth.service.js";
import sendResponse from "../../shared/sendResponse.js";
import catchAsync from "../../shared/catchAsync.js";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  const cookieOptions = {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", result.refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken: result.accessToken,
      user: result.user,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "New access token generated successfully",
    data: result,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged out successfully",
    data: "",
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await AuthService.forgetPassword(email);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset email sent successfully",
    data: result
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { token, userId, password } = req.body;
  const result = await AuthService.resetPassword(token, userId, password);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully",
    data: result
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const email = user?.email;

  const { currentPassword, newPassword } = req.body;
  
  const result = await AuthService.changePassword(
    email as string,
    currentPassword,
    newPassword
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result
  });
});

export const AuthController = {
  loginUser,
  logoutUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword, 

};
