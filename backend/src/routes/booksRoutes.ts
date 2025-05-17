import express from 'express';
import { searchBooks } from '../controllers/booksController';

const router = express.Router();

router.get('/search', searchBooks);

export default router;