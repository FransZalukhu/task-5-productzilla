import express from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User Sukses Terdaftar
 *       400:
 *         description: Bad request
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Sukses
 *       401:
 *         description: Unauthorized
 */
router.post("/login", loginUser);

export default router;
