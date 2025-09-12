import express, { Request, Response } from "express";
import authorRoutes from "./routes/authors.js";
import bookRoutes from "./routes/books.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(logger);

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Library API is running" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
