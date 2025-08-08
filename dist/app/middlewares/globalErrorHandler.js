import handleValidationError from "../errors/handleValidationError.js";
import ApiError from "../errors/ApiError.js";
import handleCastError from "../errors/handleCastError.js";
import config from "../config/index.js";
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorMessages = [];
    // Handle Mongoose validation errors
    if (err?.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    // Handle custom API errors
    else if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errorMessages = err.message ? [{ path: "", message: err.message }] : [];
    }
    // Handle Mongoose cast errors (invalid ObjectId, etc.)
    else if (err?.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    // Handle generic JavaScript/TypeScript errors
    else if (err instanceof Error) {
        message = err.message;
        errorMessages = err.message ? [{ path: "", message: err.message }] : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.NODE_ENV !== "production" ? err?.stack : undefined,
    });
};
export default globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map