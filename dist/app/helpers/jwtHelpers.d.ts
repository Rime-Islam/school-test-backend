import { type JwtPayload, type Secret } from 'jsonwebtoken';
export declare const jwtHelpers: {
    createToken: (payload: object, secret: Secret, expiresTime: string | number) => string;
    verifyToken: (token: string, secret: Secret) => JwtPayload;
};
//# sourceMappingURL=jwtHelpers.d.ts.map