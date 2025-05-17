import { BookApiResponse } from '../types/book.type';
import { BooksApiResult } from '../types/book.type';
import axios from 'axios';

const GOOGLE_BOOKS_API_BASE = process.env.GOOGLE_BOOKS_API_URL;
const API_KEY = ""; process.env.GOOGLE_BOOKS_API_KEY;

const api = axios.create({
  baseURL: GOOGLE_BOOKS_API_BASE,
  timeout: 5000
});

// 👇 Intercept every request and log URL + params
api.interceptors.request.use((config) => {
  console.log('[Axios Request]', {
    method: config.method,
    url: `${config.baseURL}${config.url}`,
    params: config.params,
  });
  return config;
}, (error) => {
  console.error('[Axios Request Error]', error.message);
  return Promise.reject(error);
});

// 👇 Intercept every response and log data
api.interceptors.response.use((response) => {
  console.log('[Axios Response]', {
    url: response.config.url,
    status: response.status,
    data: response.data,
  });
  return response;
}, (error) => {
  console.error('[Axios Response Error]', {
    url: error.config?.url,
    message: error.message,
    response: error.response?.data,
  });
  return Promise.reject(error);
});

export async function getBooks(query: string, maxResults = 10, startIndex = 0): Promise<BooksApiResult> {
  try {
    const response = await api.get('/volumes', {
      params: {
        q: query,
        maxResults,
        startIndex,
      },
    });

    return response.data || [];
  } catch (error: unknown) {
    throw new Error('Failed to fetch books from Google Books API');
  }
}