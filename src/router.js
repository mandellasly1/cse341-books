import express from 'express';
import { getBooksHandler, getBookByIdHandler, addBookHandler, updateBookHandler, deleteBookHandler, } from './controllers/books.js';
import { deleteAuthorHandler } from './controllers/authors.js';

const router = express.Router();

// READ
router.get('/books', getBooksHandler);
router.get('/books/:id', getBookByIdHandler);

// CREATE
router.post('/books', addBookHandler);

// UPDATE
router.put('/books/:id', updateBookHandler);

// DELETE
router.delete('/books/:id', deleteBookHandler);

router.delete('/authors/:id', deleteAuthorHandler);

export default router;
