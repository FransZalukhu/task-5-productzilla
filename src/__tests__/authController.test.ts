import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/userModel";
import { loginUser } from "../controllers/authController";

jest.mock("bcryptjs");
jest.mock("../models/userModel");

describe("AuthController", () => {
  it("harus mengembalikan token pada login yang berhasil.", async () => {
    const mockUser = {
      _id: "user_id",
      username: "testuser",
      password: "hashedpassword",
    };
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const req = {
      body: { username: "testuser", password: "password" },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    process.env.JWT_SECRET = "testsecret";

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ token: expect.any(String) })
    );
  });

  it("harus mengembalikan 401 pada kredensial yang tidak valid.", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const req = {
      body: { username: "testuser", password: "password" },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
  });
});
