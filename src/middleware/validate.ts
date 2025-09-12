import { Request, Response, NextFunction } from "express";

// Validation middleware for authors
export function validateAuthor(req: Request, res: Response, next: NextFunction) {
  const { name, birthYear } = req.body;
  if (!name || !birthYear) {
    return res.status(400).json({ error: "Author must have name and birthYear" });
  }
  next();
}

// Validation middleware for books
export function validateBook(req: Request, res: Response, next: NextFunction) {
  const { title, year, authorId } = req.body;
  if (!title || !year || !authorId) {
    return res.status(400).json({ error: "Book must have title, year, and authorId" });
  }
  next();
}

