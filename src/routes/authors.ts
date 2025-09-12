import { Router, Request, Response } from "express";
import { authors, Author } from "../models/author.js";
import { books } from "../models/book.js";
import { validateAuthor } from "../middleware/validate.js";

const router = Router();

router.post("/", validateAuthor, (req: Request, res: Response) => {
  const { name, birthYear } = req.body;
  const newAuthor: Author = {
    id: authors.length + 1,
    name,
    birthYear,
  };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});


router.get("/", (req: Request, res: Response) => {
  res.json(authors);
});

router.get("/:id", (req: Request, res: Response) => {
  const author = authors.find(a => a.id === Number(req.params.id));
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  res.json(author);
});

router.put("/:id", validateAuthor, (req: Request, res: Response) => {
  const author = authors.find(a => a.id === Number(req.params.id));
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  author.name = req.body.name || author.name;
  author.birthYear = req.body.birthYear || author.birthYear;
  res.json(author);
});

router.delete("/:id", (req: Request, res: Response) => {
  const index = authors.findIndex(a => a.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Author not found" });
  }
  const deleted = authors.splice(index, 1);
  res.json(deleted[0]);
});

router.get("/:id/books", (req: Request, res: Response) => {
  const authorId = Number(req.params.id);
  const author = authors.find(a => a.id === authorId);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  const authorBooks = books.filter(b => b.authorId === authorId);
  res.json({ author, books: authorBooks });
});

export default router;

