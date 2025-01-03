const express = require("express");
const router = express.Router();
const bookService = require("../services/bookService");

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of all books
 */
router.get("/", async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 */
router.get("/:id", async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Add a new book to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 description: The author of the book
 *                 example: "F. Scott Fitzgerald"
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 description: The publication date of the book
 *                 example: "1925-04-10"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 */
router.put("/:id", async (req, res) => {
    try {
        const book = await bookService.updateBook(req.params.id, req.body);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 */
router.delete("/:id", async (req, res) => {
    try {
        const result = await bookService.deleteBook(req.params.id);
        if (!result) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
