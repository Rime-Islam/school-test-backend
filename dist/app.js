import cors from "cors";
import express from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import NotFound from "./app/middlewares/NotFound.js";
import cookieParser from "cookie-parser";
import routes from "./app/routes/index.js";
const app = express();
const corsOptions = {
    origin: [
        "https://school-test-frontend-dolz.vercel.app"
        // "http://localhost:5173"
    ],
    credentials: true,
};
app.use(cors(corsOptions));
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/v1', routes);
app.get("/", (req, res) => {
    res.send("School test working  successfully");
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
});
app.use(globalErrorHandler);
// app.use(NotFound);
export default app;
//# sourceMappingURL=app.js.map