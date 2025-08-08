/* eslint-disable @typescript-eslint/no-namespace */
import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import type mongoose from 'mongoose';
import config from '../config/index.js';
import { User } from '../modules/user/user.model.js';
import ApiError from '../errors/ApiError.js';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import sendResponse from '../shared/sendResponse.js';

// declare global {
//   namespace Express {
//     export interface Request {
//       user: {
//         _id: mongoose.Types.ObjectId;
//         userId: string;
//         userName: string;
//         role: string;
//       };
//     }
//   }
// }

export const isAuth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Get token from multiple sources
      const authToken =
        req.cookies?.refreshToken ||
        req.headers?.authorization?.split(' ')[1] ||
        (req.headers?.cookie && 
          req.headers.cookie.split(';')
            .find(c => c.trim().startsWith('refreshToken='))
            ?.split('=')[1]
        );

      if (!authToken) {
        return sendResponse(res, {
          statusCode: httpStatus.UNAUTHORIZED, // 401 is more appropriate
          success: false,
          message: 'Authorization token not found',
          data: null,
        });
      }

      // 2. Verify token
      const payload = jwt.verify(authToken, config.jwtSecret) as JwtPayload & {
        userId: string;
        role: string;
      };

      // 3. Find user by ID (not userId unless that's your schema)
      const user = await User.findById(payload.userId);
      if (!user) {
        return sendResponse(res, {
          statusCode: httpStatus.NOT_FOUND, // 404 for not found
          success: false,
          message: 'User not found',
          data: null,
        });
      }

      // 4. Check roles
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN, // 403 for forbidden
          'Insufficient permissions to access this resource'
        );
      }

      // 5. Attach user to request
      req.user = {
        ...payload,
        _id: user._id,
        name: user.name,
        role: user.role,
      };

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return sendResponse(res, {
          statusCode: httpStatus.UNAUTHORIZED,
          success: false,
          message: 'Invalid or malformed token',
          data: null,
        });
      }
      if (error instanceof jwt.TokenExpiredError) {
        return sendResponse(res, {
          statusCode: httpStatus.UNAUTHORIZED,
          success: false,
          message: 'Token has expired',
          data: null,
        });
      }
      if (error instanceof ApiError) {
        return sendResponse(res, {
          statusCode: error.statusCode,
          success: false,
          message: error.message,
          data: null,
        });
      }
      next(error);
    }
  };