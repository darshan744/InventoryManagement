import Express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/Auth.routes";
import errorHandler from "./middlewares/ErrorMiddleware";
import loggerMiddleware from "./middlewares/LoggerMiddleware";
const app = Express();
// Middleware to handle CORS and JSON parsing
app.use(cors());
app.use(Express.json());
app.use(cookieParser());
app.use(loggerMiddleware);
// Endpoint to check if the server is running
app.get("/ping", (_req, res) => {
  res.json("pong");
});
app.use("/api", authRoutes);

app.use(errorHandler);
export default app;
