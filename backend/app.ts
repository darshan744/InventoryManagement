import Express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/Auth.routes";
import errorHandler from "./middlewares/ErrorMiddleware";
import loggerMiddleware from "./middlewares/LoggerMiddleware";
import authMiddleware from "./middlewares/AuthMiddleware";
import productRoutes from "./routes/Product.routes";
const app = Express();
// Middleware to handle CORS and JSON parsing
app.use(cors());
app.use(cookieParser());
app.use(Express.json());
app.use("/api", authMiddleware);
app.use(loggerMiddleware);

// Endpoint to check if the server is running
app.get("/ping", (_req, res) => {
  res.json("pong");
});
app.use(authRoutes);
app.use("/api", productRoutes);

app.use(errorHandler);
export default app;
