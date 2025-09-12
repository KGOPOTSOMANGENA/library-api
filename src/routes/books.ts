import { Router, Request, Response } from "express";
import { books, Book } from "../models/book.js";
import { authors } from "../models/author.js";
import { validateBook } from "../middleware/validate.js";

const router = Router();

router.post("/", validateBook, (req: Request, res: Response) => {
  const { title, year, authorId } = req.body;


  const authorExists = authors.find(a => a.id === Number(authorId));
  if (!authorExists) {
    return res.status(400).json({ error: "Author does not exist" });
  }

  
  const duplicate = books.find(b => b.title === title && b.authorId === authorId);
  if (duplicate) {
    return res.status(409).json({ error: "Book already exists" });
  }

  const newBook: Book = {
    id: books.length + 1,
    title,
    year,
    authorId,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});


router.get("/", (req: Request, res: Response) => {
  let result = books;

  if (req.query.title) {
    result = result.filter(b =>
      b.title.toLowerCase().includes((req.query.title as string).toLowerCase())
    );
  }

  if (req.query.year) {
    result = result.filter(b => b.year === Number(req.query.year));
  }

  if (req.query.authorId) {
    result = result.filter(b => b.authorId === Number(req.query.authorId));
  }

  if (req.query.sort) {
    const sortField = req.query.sort as keyof Book;
    result = [...result].sort((a, b) =>
      a[sortField] > b[sortField] ? 1 : -1
    );
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || result.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({
    total: result.length,
    page,
    limit,
    data: paginated,
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(book);
});

router.put("/:id", validateBook, (req: Request, res: Response) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (req.body.title) book.title = req.body.title;
  if (req.body.year) book.year = req.body.year;
  if (req.body.authorId) {
    const authorExists = authors.find(a => a.id === Number(req.body.authorId));
    if (!authorExists) {
      return res.status(400).json({ error: "Invalid authorId" });
    }
    book.authorId = req.body.authorId;
  }

  res.json(book);
});

router.delete("/:id", (req: Request, res: Response) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }
  const deleted = books.splice(index, 1);
  res.json(deleted[0]);
});

export default router;

