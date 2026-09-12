import express from 'express';
import { getBooksHandler, getBookByIdHandler, addBookHandler } from './controllers/books.js';

const router = express.Router();

router.get('/books', getBooksHandler);

router.get('/books/:id', getBookByIdHandler);

router.post('/books', addBookHandler);

export default router;
