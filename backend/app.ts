import Express from "express";
const app = Express();
import cors from "cors";

// Middleware to handle CORS and JSON parsing
app.use(cors());
app.use(Express.json());

// Endpoint to check if the server is running
app.get("/ping", (_req, res) => {
  res.status(200).send("pong");
});
export default app;
