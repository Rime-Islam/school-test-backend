import mongoose from "mongoose";
import type { IGenericErrorMessage } from "../interfaces/error.js";
declare const handleCastError: (error: mongoose.Error.CastError) => {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};
export default handleCastError;
//# sourceMappingURL=handleCastError.d.ts.map