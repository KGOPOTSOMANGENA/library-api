# 📚 Library API (Express + TypeScript)

A RESTful API for managing a library system with two resources:
- **Authors**
- **Books** (each book belongs to an author)

This project demonstrates CRUD operations, validation, relationships, error handling, logging, and optional advanced queries.

---

## 🚀 Features
- Create, Read, Update, Delete **Authors** and **Books**
- Each book is linked to a valid author (`authorId`)
- Search, filter, sort, and paginate books
- Input validation middleware (reject invalid data)
- Logger middleware (logs HTTP method & URL)
- Centralized error handling
- Handles common errors:
  - **400**: Bad Request (invalid data)
  - **404**: Not Found (resource missing)
  - **409**: Conflict (duplicate book)

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- TypeScript

---

## 📂 Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/KGOPOTSOMANGENA/library-api.git
cd library-api

### 2. install dependencies and run the project 
npm install
npx tsc
node dist/index.js

Api will run at http://localhost:5000

***End points***

Method |Endpoint     |Description
POST   |/authors     |Create new author
GET    |/authors     |Get all authors
GET	   |/authors/:id |Get author by ID
PUT    |/authors/:id |Update author
DELETE |/authors/:id |Delete author
GET	   |/authors/:id/books |	Get books by this author

Example Request (POST /authors)
{
  "name": "George Orwell",
  "birthYear": 1903
}

Example Response
{
  "id": 1,
  "name": "George Orwell",
  "birthYear": 1903
}


***End points***

Method	|Endpoint	|Description
POST	  |books	  |Create new book
GET	    |books	  |Get all books
GET	    |books/:id|Get book by ID
PUT	    |books/:id|Update book
DELETE	|books/:id|Delete book

Example Request (POST /books)
{
  "title": "1984",
  "year": 1949,
  "authorId": 1
}

Example Response
{
  "id": 1,
  "title": "1984",
  "year": 1949,
  "authorId": 1
}