import type { Secret } from "jsonwebtoken";
import ApiError from "../../errors/ApiError.js";
import { jwtHelpers } from "../../helpers/jwtHelpers.js";
import type { IUser } from "../user/user.interface.js";
import { User } from "../user/user.model.js";
import httpStatus from "http-status";
import config from "../../config/index.js";
import bcrypt from "bcrypt";
import { resetPasswordEmail } from "../../shared/sendEmail.js";

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

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

   const resetToken = jwtHelpers.createToken(
    { userId: user._id, email: user.email },
    config.jwtSecret as Secret,
    '15m'
  );

  const resetUrl = `${config.frontend_url}/reset-password?token=${resetToken}&id=${user._id}`;

  await resetPasswordEmail(user.email, resetUrl, user.name);

  return {
      _id: user._id,
      email: user.email
  }
};

const resetPassword = async (
  token: string,
  userId: string,
  newPassword: string
) => {
  let decoded;
  try {
     decoded = jwtHelpers.verifyToken(
      token,
      config.jwtSecret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired token');
  }

  const user = await User.findById({ _id: userId });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (decoded.userId !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token for this user');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return {
      _id: user._id,
      email: user.email
  };
};

const changePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await User.isUserExist(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    currentPassword,
    user.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Current password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { password: hashedPassword },
    { new: true }
  ).select('-password -__v -otp');

  if (!updatedUser) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Password update failed');
  }

  return {updatedUser};
};

export const AuthService = {
  loginUser,
  refreshToken,
  forgetPassword,
  resetPassword,
  changePassword,
};