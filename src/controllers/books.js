import { getAllBooks, getBookById, addBook } from '../models/books.js';
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

// POST add book
const addBookHandler = async (req, res) => {
  try {
    const newBook = req.body;

    if (!newBook.id || !newBook.title || !newBook.author || !newBook.publicationDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await addBook(newBook);
    return res.status(201).json({ message: 'Book added successfully', id: result.insertedId });
  } catch (error) {
    console.error('POST /books failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Extra: direct MongoDB create (if you want to bypass models)
const createBook = async (req, res) => {
  try {
    const { id, title, author } = req.body;

    if (!id || !title || !author) {
      return res.status(400).json({ message: 'id, title, and author are required' });
    }

    const newBook = { id, title, author };
    const result = await getDb().collection('books').insertOne(newBook);

    if (result.insertedId) {
      return res.status(201).json(newBook);
    } else {
      return res.status(500).json({ message: 'Unable to create book' });
    }
  } catch (error) {
    console.error('Direct createBook failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateBookHandler = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body;

    if (!updatedBook.title || !updatedBook.author) {
      return res.status(400).json({ message: 'title and author are required' });
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


export { getBooksHandler, getBookByIdHandler, addBookHandler, createBook, updateBookHandler, deleteBookHandler };
