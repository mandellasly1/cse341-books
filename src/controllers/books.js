import { getAllBooks, getBookById } from '../models/books.js';
import { getDb } from '../db/connect.js';

// GET all books
const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.error('GET /books failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET book by ID
const getBookByIdHandler = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await getBookById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('GET /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST add book with author validation
const addBookHandler = async (req, res) => {
  try {
    const newBook = req.body;

    // Validate required fields
    if (!newBook.id || !newBook.title || !newBook.authorId || !newBook.publicationDate) {
      return res.status(400).json({ message: 'id, title, authorId, and publicationDate are required' });
    }

    const db = getDb();

    // Check if author exists
    const author = await db.collection('authors').findOne({ id: newBook.authorId });
    if (!author) {
      return res.status(400).json({ message: `Author with id ${newBook.authorId} does not exist` });
    }

    // Insert the new book
    const result = await db.collection('books').insertOne(newBook);

    if (result.insertedId) {
      return res.status(201).json({
        message: 'Book added successfully',
        book: newBook
      });
    } else {
      return res.status(500).json({ message: 'Unable to add book' });
    }
  } catch (error) {
    console.error('POST /books failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT update book
const updateBookHandler = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body;

    if (!updatedBook.title || !updatedBook.authorId) {
      return res.status(400).json({ message: 'title and authorId are required' });
    }

    const result = await getDb()
      .collection('books')
      .updateOne({ id: bookId }, { $set: updatedBook });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error('PUT /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE book
const deleteBookHandler = async (req, res) => {
  try {
    const bookId = req.params.id;

    const result = await getDb()
      .collection('books')
      .deleteOne({ id: bookId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(204).send(); // No Content
  } catch (error) {
    console.error('DELETE /books/:id failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  getBooksHandler,
  getBookByIdHandler,
  addBookHandler,
  updateBookHandler,
  deleteBookHandler
};
