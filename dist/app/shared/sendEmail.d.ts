import nodemailer from 'nodemailer';
export declare const transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo, import("nodemailer/lib/smtp-transport/index.js").Options>;
export declare const sendEmail: (mailOptions: any) => Promise<void>;
export declare const emailVerificationOTP: (email: string, otp: string, name: string) => void;
export declare const emailVerificationSuccess: (email: string, name: string) => Promise<void>;
export declare const resetPasswordEmail: (email: string, url: string, name: string) => Promise<void>;
//# sourceMappingURL=sendEmail.d.ts.map