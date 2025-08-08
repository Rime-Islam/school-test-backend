import config from "../config/index.js";
import nodemailer from 'nodemailer';
// transporter for email
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config.user_name,
        pass: config.password
    }
});
// function to send email
export const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        throw error;
    }
};
// email verification via OTP 
export const emailVerificationOTP = (email, otp, name) => {
    const mailOptions = {
        from: `"School Test" <${config.user_name}>`,
        to: email,
        subject: 'Email Verification - School Test',
        text: `
      Dear ${name},

      Thank you for registering with School Test. To verify your email address, please use the following One-Time Password (OTP):

      OTP: ${otp}

      This OTP is valid for a 10 minutes. Please do not share this OTP with anyone.

      If you did not request this, please ignore this email.

      Best regards,
      School Test Team
    `,
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Dear ${name},</p>
          <p>Thank you for registering with School Test. To verify your email address, please use the following One-Time Password (OTP):</p>
          <h2 style="background-color:#1a73e8; color:#fff; display:inline-block; padding:10px 20px; border-radius:5px;">${otp}</h2>
          <p>This OTP is valid for a limited time. Please do not share this OTP with anyone.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p style="font-size: 0.9em; color: #777;">
              Best regards,<br>
              School Test Team
          </p>
      </div>
    `
    };
    sendEmail(mailOptions);
};
// email verification success
export const emailVerificationSuccess = (email, name) => {
    const mailOptions = {
        from: `"School Test" <${config.user_name}>`,
        to: email,
        subject: 'Email Verified Successfully - School Test',
        text: `
      Dear ${name},

      Congratulations! Your email address has been successfully verified.

      You can now enjoy full access to your School Test account.

      If you did not complete this verification, please contact our support team immediately.

      Best regards,
      School Test Team
    `,
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear ${name},</p>
        
        <p style="font-size: 1.1em; color: #1a73e8; font-weight: bold;">
          Congratulations! Your email address has been successfully verified.
        </p>
        
        <p>You can now enjoy full access to your School Test account.</p>
        
        <div style="background-color: #f0f7ff; padding: 15px; border-left: 4px solid #1a73e8; margin: 20px 0;">
          <p style="margin: 0; font-size: 0.9em; color: #555;">
            If you did not complete this verification, please contact our support team immediately.
          </p>
        </div>
        
        <p style="font-size: 0.9em; color: #777;">
          Best regards,<br>
          School Test Team
        </p>
      </div>
    `
    };
    return sendEmail(mailOptions);
};
// reset password email template
export const resetPasswordEmail = (email, url, name) => {
    const mailOptions = {
        from: `"School Test" <${config.user_name}>`,
        to: email,
        subject: 'Password Reset Request - School Test',
        text: `
      Dear ${name},

      You requested to reset your password. Please click the link below to proceed:

      ${url}

      This link will expire in 15 minutes. If you didn't request this, please ignore this email.

      Best regards,
      School Test Team
    `,
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear ${name},</p>
        
        <p>You requested to reset your password. Please click the button below to proceed:</p>
        
        <a href="${url}" style="background-color: #1a73e8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0;">
          Reset Password
        </a>
        
        <p style="font-size: 0.9em; color: #777;">
          This link will expire in 15 minutes. If you didn't request this, please ignore this email.
        </p>
        
        <p style="font-size: 0.9em; color: #777;">
          Best regards,<br>
          School Test Team
        </p>
      </div>
    `
    };
    return sendEmail(mailOptions);
};
//# sourceMappingURL=sendEmail.js.map