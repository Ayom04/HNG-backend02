import { expect } from "chai";
import { generateAccessToken } from "../utils/auth"; 
import { describe, it } from "node:test";
import jwt, { JwtPayload } from "jsonwebtoken";


describe("Token Generation", () => {
  it("should generate token with correct expiry", () => {
    const email = "lasr@gmail.com";
    const token = generateAccessToken(email);

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret23"
    )as JwtPayload; ;

    expect(decodedToken.exp).to.exist;
    expect(decodedToken.exp).to.be.a("number");
    expect(decodedToken.exp).to.be.greaterThan(Date.now() / 1000);
    expect(decodedToken.exp).to.be.lessThan(Date.now() / 1000 + 60 * 60);
    expect(decodedToken.email).to.equal(email);
    expect(decodedToken.iat).to.exist;
    expect(decodedToken.iat).to.be.a("number");
    expect(decodedToken.iat).to.be.greaterThan(Date.now() / 1000);
    expect(decodedToken.iat).to.be.lessThan(Date.now() / 1000 + 60 * 60);

   
  });

  // Add more unit tests for other authentication-related functions
});
