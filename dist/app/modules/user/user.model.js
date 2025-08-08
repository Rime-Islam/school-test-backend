import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { generateOTP } from "../../shared/otpGenerator.js";
import { emailVerificationOTP } from "../../shared/sendEmail.js";
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "student", "supervisor"],
        default: "student",
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        code: {
            type: String,
        },
        expiresAt: {
            type: Date,
        },
    },
}, { timestamps: true });
UserSchema.statics.isUserExist = async function (email) {
    return this.findOne({ email }, {
        email: 1,
        role: 1,
        password: 1,
        emailVerified: 1,
        otp: 1,
    }).lean();
};
UserSchema.statics.isPasswordMatched = async function (givenPassword, savedPassword) {
    return bcrypt.compare(givenPassword, savedPassword);
};
UserSchema.statics.verifyOTP = async function (user, code) {
    if (!user.otp || !user.otp.code || !user.otp.expiresAt) {
        throw new Error('No OTP found');
    }
    console.log(code);
    if (user.otp.code !== code) {
        throw new Error('Invalid OTP');
    }
    if (user.otp.expiresAt < new Date()) {
        throw new Error('OTP has expired');
    }
    return true;
};
export const User = model("User", UserSchema);
//# sourceMappingURL=user.model.js.map