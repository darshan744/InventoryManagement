import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err.stack);
  res
    .status(
      "statuscode" in err ? Number(err.statuscode) : 500, // Use 'statuscode' if available, otherwise default to 500
    )
    .json({
      message: err.message,
      error:
        process.env.NODE_ENV === "production" ? "Internal Server Error" : err,
    });
}
