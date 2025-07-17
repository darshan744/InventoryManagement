import environtments from "../environtments";
import jwt, { SignOptions } from "jsonwebtoken";
import AppError from "./AppError";

/**
 * @description Signs a JWT token with the provided object and options.
 * @param {object} obj - The payload to sign.
 * @param {SignOptions} [options] - Optional signing options.
 * @param {("access" | "refresh")} [type="access"] - The type of token to sign, either "access" or "refresh".
 * @return {string} - The signed JWT token.
 * @throws {AppError} - Throws an error if the secret key is not defined.
 * */
export function signToken(
  obj: any,
  options?: SignOptions,
  type: "access" | "refresh" = "access",
) {
  let secretKey: string | undefined;
  switch (type) {
    case "access":
      secretKey = environtments.jwtKey;
      break;
    case "refresh":
      secretKey = environtments.refreshTokenKey;
    default:
      break;
  }
  if (!secretKey) {
    throw new AppError("JWT secret key is not defined", 500);
  }

  const encryptedToken = jwt.sign(obj, secretKey, options);
  return encryptedToken;
}
/**
 * @description Verifies a JWT token and returns the payload.
 * @param {string} token - The JWT token to verify.
 * @param {("access" | "refresh")} type - The type of token to verify, either "access" or "refresh".
 * @return {object} - The decoded payload of the token.
 * @throws {AppError} - Throws an error if the token is invalid or if the secret key is not defined.
 * */
export function verifyToken(token: string, type: "access" | "refresh" = "access") {
  let secretKey: string | undefined;
  switch (type) {
    case "access":
      secretKey = environtments.jwtKey;
      break;
    case "refresh":
      secretKey = environtments.refreshTokenKey;
      break;
    default:
      throw new AppError("Invalid token type", 400);
  }
  if (!secretKey) {
    throw new AppError("JWT secret key is not defined", 500);
  }
  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch (error: any) {
    throw new AppError("Invalid token", 401);
  }
}
