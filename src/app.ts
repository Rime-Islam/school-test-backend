import cors from "cors";
import express from "express";
import type { Application, NextFunction, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import NotFound from "./app/middlewares/NotFound.js";
import cookieParser from "cookie-parser";
import routes from "./app/routes/index.js";

const app: Application = express();

const corsOptions = {
  origin: [
    // "https://godly-music.surge.sh"
    "http://localhost:5173"
  ],
  credentials: true,
};

app.use(cors(corsOptions));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use('/api/v1', routes);

app.get("/", (req: Request, res: Response) => {
  res.send("School test working  successfully");
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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