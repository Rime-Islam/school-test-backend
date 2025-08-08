import bcrypt from "bcrypt";
import httpStatus from "http-status";
import type { IUser } from "./user.interface.js";
import { User } from "./user.model.js";
import { generateOTP } from "../../utils/otpGenerator.js";
import { emailVerificationOTP, emailVerificationSuccess } from "../../utils/sendEmail.js";
import { jwtHelpers } from "../../helpers/jwtHelpers.js";
import type { Secret } from "jsonwebtoken";
import config from "../../config/index.js";
import ApiError from "../../errors/ApiError.js";

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

const loginUser = async (payload: Pick<IUser, "email" | "password">) => {
  const { email, password } = payload;

  const user = await User.isUserExist(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  if (!user.emailVerified) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Email not verified. Please verify your email first."
    );
  }

  const accessToken = jwtHelpers.createToken(
    { userId: user._id, role: user.role },
    config.jwtSecret as Secret,
    config.expires_in as string
  );

  // Create refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId: user._id, role: user.role },
    config.jwtSecret as Secret,
    config.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwtSecret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
  }

  const { userId } = verifiedToken;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const newAccessToken = jwtHelpers.createToken(
    { userId: user._id, role: user.role },
    config.jwtSecret as Secret,
    config.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};



export const UserService = {
  createUser,
  loginUser,
  refreshToken,
  verifyEmailOTP,
};
