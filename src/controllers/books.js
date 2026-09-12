import { getAllBooks, getBookById, addBook } from '../models/books.js';

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.error('GET /books failed:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

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

export { getBooksHandler, getBookByIdHandler, addBookHandler };
