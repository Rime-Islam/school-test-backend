import jwt,{ type JwtPayload, type Secret, type SignOptions }  from 'jsonwebtoken';

const createToken = (payload: object, secret: Secret, expiresTime: string | number) => {
  return jwt.sign(payload, secret, { expiresIn: expiresTime } as SignOptions);
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};