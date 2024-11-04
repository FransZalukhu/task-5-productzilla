import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import authenticateJWT from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               code:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/books", authenticateJWT, createBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/books", getBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Buku
 *     responses:
 *       200:
 *         description: Buku Ditemukan
 *       404:
 *         description: Buku Tidak Ditemukan
 */
router.get("/books/:id", getBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update Buku Berdasarkan ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID Buku
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               code:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update Buku Sukses
 *       404:
 *         description: Buku Tidak Ditemukan
 */
router.put("/books/:id", authenticateJWT, updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Buku Berhasil Dihapus
 *       404:
 *         description: Buku Tidak Ditemukan
 */
router.delete("/books/:id", authenticateJWT, deleteBook);

export default router;
