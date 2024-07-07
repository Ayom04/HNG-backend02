const saltRounds = 10;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const hashPassword = async (
    password: string
  ): Promise<{ salt: string; hash: string }> => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          resolve({ salt, hash });
        });
      });
    });
  };
  
  const comparePassword = async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      let result = bcrypt.compare(password, hashedPassword);
      if (result) {
        resolve(result);
      } else {
        reject(Error);
      }
    });
  };
  const generateAccessToken = (email: string): string => {
    return jwt.sign({ email }, process.env.JWT_SECRET ||"secret123", {
      expiresIn: process.env.JWT_EXPIRES_IN||"1d",
    });
  };
  export { hashPassword, comparePassword };