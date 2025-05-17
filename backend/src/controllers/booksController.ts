import { Request, Response } from 'express';

import { fetchBooks } from '../services/googleBooksService';
import { recordResponseTime } from '../utils/responseTimer';
import { DEFAULT_PAGE_NUMBER,DEFAULT_PAGE_LIMIT } from './../constants/booksConstants';

export const searchBooks = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  const page = parseInt(req.query.page as string) || DEFAULT_PAGE_NUMBER;
  const limit = parseInt(req.query.maxResults as string) || DEFAULT_PAGE_LIMIT;

  if (!query) {
    return res.status(400).json({ message: 'Missing search query' });
  }

  if (isNaN(+limit) || isNaN(+page)) {
    return res.status(400).json({ error: 'Invalid maxResults or page number' });
  }

  const start = Date.now();
  try {
    const result = await fetchBooks(query, page, limit);
    const timeTaken = recordResponseTime(start);

    return res.json({ ...result, responseTimeMs: timeTaken });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};