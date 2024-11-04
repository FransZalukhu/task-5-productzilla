import { Request, Response } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import Book from "../models/bookModel";

jest.mock("../models/bookModel");

describe("Book Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    res = {
      status: jest.fn(() => res) as any,
      json: jsonMock,
    };
  });

  describe("createBook", () => {
    it("should create a new book and return it", async () => {
      const newBook = { title: "Test Book", author: "Test Author" };
      (Book.create as jest.Mock).mockResolvedValue(newBook);
      req.body = newBook;

      await createBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(newBook);
    });

    it("should handle errors", async () => {
      const errorMessage = "Creation failed";
      (Book.create as jest.Mock).mockRejectedValue(new Error(errorMessage));
      req.body = { title: "Test Book" };

      await createBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("getBooks", () => {
    it("should return a list of books", async () => {
      const books = [{ title: "Book 1" }, { title: "Book 2" }];
      (Book.find as jest.Mock).mockResolvedValue(books);

      await getBooks(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(books);
    });
  });

  describe("getBookById", () => {
    it("should return a book by ID", async () => {
      const book = { title: "Test Book" };
      req.params = { id: "123" };
      (Book.findById as jest.Mock).mockResolvedValue(book);

      await getBookById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(book);
    });

    it("should handle book not found", async () => {
      req.params = { id: "123" };
      (Book.findById as jest.Mock).mockResolvedValue(null);

      await getBookById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Buku Tidak Ditemukan",
      });
    });
  });

  describe("updateBook", () => {
    it("should update a book and return the updated book", async () => {
      const updatedBook = { title: "Updated Book" };
      req.params = { id: "123" };
      req.body = updatedBook;
      (Book.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedBook);

      await updateBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(updatedBook);
    });

    it("should handle book not found during update", async () => {
      req.params = { id: "123" };
      req.body = { title: "Updated Book" };
      (Book.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await updateBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Buku Tidak Ditemukan",
      });
    });
  });

  describe("deleteBook", () => {
    it("should delete a book and return a success message", async () => {
      req.params = { id: "123" };
      (Book.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      await deleteBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Buku Dihapus" });
    });

    it("should handle book not found during deletion", async () => {
      req.params = { id: "123" };
      (Book.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await deleteBook(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Buku Tidak Ditemukan",
      });
    });
  });
});
