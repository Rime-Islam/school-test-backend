import bcrypt from "bcrypt";
import httpStatus from "http-status";
import type { IUser } from "./user.interface.js";
import { User } from "./user.model.js";
import ApiError from "../../errors/ApiError.js";
import { generateOTP } from "../../shared/otpGenerator.js";
import { emailVerificationOTP, emailVerificationSuccess } from "../../shared/sendEmail.js";

const createUser = async (payload: IUser) => {
  const isExist = await User.isUserExist(payload.email);
  if (isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User already exists with this email"
    );
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const otp = generateOTP();

  const user = await User.create({
    ...payload,
    password: hashedPassword,
    otp,
  });

  emailVerificationOTP(payload.email, otp.code, payload.name);

  return user;
};

const verifyEmailOTP = async (email: string, code: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.emailVerified) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already verified");
  }

  try {
    await User.verifyOTP(user, code);
  } catch (error: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }

  user.emailVerified = true;
  user.otp = null;
  await user.save();

  await emailVerificationSuccess(user.email, user.name);

  return {
    user,
  };
};

const resendOTPService = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const otp = generateOTP();

  user.otp = otp;
  await user.save();

  emailVerificationOTP(user.email, otp.code, user.name);

  return {otp};
};

export const UserService = {
  createUser,
  verifyEmailOTP,
  resendOTPService
};
