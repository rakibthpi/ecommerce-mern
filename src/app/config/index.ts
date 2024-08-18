import dotsenv from "dotenv";
import path from "path";

dotsenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  mongoUrl: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALE_ROUNDS || 10,
  default_password: process.env.DEFAULT_PASS,
};
