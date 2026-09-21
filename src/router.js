import express from 'express';
import { getBooksHandler, getBookByIdHandler, addBookHandler, updateBookHandler, deleteBookHandler } from './controllers/books.js';
import { getAuthorsHandler, getAuthorByIdHandler, addAuthorHandler, deleteAuthorHandler } from './controllers/authors.js';

const router = express.Router();

// BOOK routes
router.get('/books', getBooksHandler);
router.get('/books/:id', getBookByIdHandler);
router.post('/books', addBookHandler);
router.put('/books/:id', updateBookHandler);
router.delete('/books/:id', deleteBookHandler);

// AUTHOR routes
router.get('/authors', getAuthorsHandler);
router.get('/authors/:id', getAuthorByIdHandler);
router.post('/authors', addAuthorHandler);
router.delete('/authors/:id', deleteAuthorHandler);

export default router;
