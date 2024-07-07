
import jwt from "jsonwebtoken";

const generateAccessToken = (email: string): string => {
  return jwt.sign({ email }, process.env.JWT_SECRET || "secret123", {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};
export {
    generateAccessToken
}
