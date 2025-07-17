import { config } from "dotenv";
config();

export default {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  jwtKey: process.env.JWT_SECRET,
  refreshTokenKey: process.env.REFRESH_TOKEN_SECRET,
};
