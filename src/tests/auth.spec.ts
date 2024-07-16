import request from "supertest";
import app from "../../index";
import chai from "chai";
const expect = chai.expect;
import { describe, it } from "node:test";

describe("POST /auth/register", () => {
  it("should register user successfully with default ", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Password1@",
      phone: "1234567890",
    };

    const res = await request(app)
      .post("/auth/register")
      .send(userData)
      .expect(201);

    expect(res.body).to.have.property("status", "success");
    expect(res.body).to.have.property("message", "Registration successful");
    expect(res.body.data.user).to.have.property("userId");
    expect(res.body.data.user).to.have.property("firstName", "John");
    expect(res.body.data.user).to.have.property("lastName", "Doe");
    expect(res.body.data.user).to.have.property(
      "email",
      "john.doe@example.com"
    );
    expect(res.body.data.user).to.have.property("phone", "1234567890");
    expect(res.body.data.user).to.have.property("organisation");
  });

  it("should fail if required fields are missing", async () => {
    const userData = {};

    const res = await request(app)
      .post("/auth/register")
      .send(userData)
      .expect(422);

    expect(res.body).to.have.property("status", "Bad Request");
    expect(res.body).to.have.property("message", "Validation failed");
    expect(res.body.errors).to.be.an("array").that.is.not.empty;
    expect(res.body.errors[0]).to.have.property("field", "firstName");
    expect(res.body.errors[0]).to.have.property(
      "message",
      "First name is required"
    );
    expect(res.body.errors[1]).to.have.property("field", "lastName");
    expect(res.body.errors[1]).to.have.property(
      "message",
      "Last name is required"
    );
    expect(res.body.errors[2]).to.have.property("field", "email");
    expect(res.body.errors[2]).to.have.property("message", "Email is required");
    expect(res.body.errors[3]).to.have.property("field", "password");
    expect(res.body.errors[3]).to.have.property(
      "message",
      "Password is required"
    );
    expect(res.body.errors[4]).to.have.property("field", "phone");
    expect(res.body.errors[4]).to.have.property("message", "Phone is required");
  });

  it("should log the user in successfully", async () => {
    const loginData = {
      email: "john.doe@example.com",
      password: "password123",
    };

    const res = await request(app)
      .post("/auth/login")
      .send(loginData)
      .expect(200);

    expect(res.body).to.have.property("status", "success");
    expect(res.body).to.have.property("message", "Login successful");
    expect(res.body.data.user).to.have.property("userId");
    expect(res.body.data.user).to.have.property("firstName", "John");
    expect(res.body.data).to.have.property("accessToken");
  });

  it("should fail if required fields are missing", async () => {
    const loginData = {}; // Missing required fields
  });
});
