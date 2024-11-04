import { Request, Response } from "express";
import Book from "../models/bookModel";

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  const books = await Book.find();
  res.status(200).json(books);
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const book = await Book.findById(req.params.id);
  if (book) res.status(200).json(book);
  else res.status(404).json({ message: "Buku Tidak Ditemukan" });
};

export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (book) res.status(200).json(book);
  else res.status(404).json({ message: "Buku Tidak Ditemukan" });
};

export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (book) res.status(200).json({ message: "Buku Dihapus" });
  else res.status(404).json({ message: "Buku Tidak Ditemukan" });
};
