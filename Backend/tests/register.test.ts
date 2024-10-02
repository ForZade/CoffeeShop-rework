// import request from "supertest";
// import express from "express";
const request = require("supertest");
const express = require("express");

const authControllers = require("../src/controllers/authControllers.ts");

// import authControllers from "../src/controllers/authControllers.js";

const app = express();
app.use(express.json());
app.use("/test/auth/register", authControllers.register);

describe("Register", () => {
  it("should return 200 if user is registered", async () => {
    const response = await request(app).post("/test/auth/register").send({
      first_name: "John",
      last_name: "Doe",
      email: "XxJqK@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "Registration successful. Please verify your email.",
    );
  });

  it("should return 400 if user already exists", async () => {
    const response = await request(app).post("/test/auth/register").send({
      first_name: "John",
      last_name: "Doe",
      email: "XxJqK@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("User with this email already exists.");
  });

  it("should return 400 if password is missing", async () => {
    const response = await request(app).post("/test/auth/register").send({
      first_name: "John",
      last_name: "Doe",
      email: "XxJqK@example.com",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Password is required.");
  });
});
