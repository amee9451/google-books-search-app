import { getFromCache, saveToCache } from './cacheService';
import { BooksApiResult, BookApiResponse } from '../types/book.type';
import { getBooks } from './APIService';

export const fetchBooks = async (query: string, page: number, limit: number) => {
  const cacheKey = `${query}-${page}-${limit}`;
  const cached = await getFromCache(cacheKey);

  if (cached) return JSON.parse(cached);

  const response = await getBooks(query, limit, page);

  if (!response || !Array.isArray(response.items)) {
    throw new Error('Invalid response from getBooks: items missing');
  }

  const items = response.items;
  const authors: Record<string, number> = {};
  let earliest = '9999', latest = '0000';

  const books = items.map((item) => {
    const {
      volumeInfo: {
        title,
        authors: bookAuthors = [],
        publishedDate = '',
        description = '',
        publisher = '',
        imageLinks: { smallThumbnail = '' } = {},
        previewLink = '',
      },
      saleInfo: {
        listPrice: { amount: listPriceAmount = '' } = {},
      },
    }: BookApiResponse = item;

    bookAuthors.forEach((author) => {
      authors[author] = (authors[author] || 0) + 1;
    });

    const year = publishedDate.slice(0, 4);
    if (year && year < earliest) earliest = year;
    if (year && year > latest) latest = year;

    return {
      title,
      authors: bookAuthors,
      publishedDate,
      description,
      publisher,
      smallThumbnail,
      previewLink,
      listPriceAmount,
    };
  });

  const topAuthor = Object.entries(authors).sort((a, b) => b[1] - a[1])[0]?.[0];
  const totalItems = response.totalItems ?? items.length;

  const result = {
    totalItems,
    books,
    stats: {
      mostFrequentAuthor: topAuthor,
      earliestPublishedYear: earliest,
      latestPublishedYear: latest,
    },
  };

  await saveToCache(cacheKey, JSON.stringify(result));
  return result;
};