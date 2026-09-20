import express from 'express';
import { getBooksHandler, getBookByIdHandler, addBookHandler, updateBookHandler, deleteBookHandler } from './controllers/books.js';

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

export default router;
