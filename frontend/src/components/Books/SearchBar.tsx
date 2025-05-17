import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { sanitizeInput } from '../../utils/sanitizeInput';
import { SearchBarProps } from '../../types/BookList.types';
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_NUMBER,
  PAGINATION_LIST,
} from '../../constants/Book';
import { searchBooks } from '../../services/googleBooks';

const Pagination = React.lazy(() => import('./Pagination'));

const SearchBar: React.FC<SearchBarProps> = ({ setBooks, setStats }) => {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(DEFAULT_PAGE_NUMBER);
  const [loading, setLoading] = useState(false);
  const lastSearchRef = useRef({ query: '', limit: DEFAULT_PAGE_LIMIT, page: DEFAULT_PAGE_NUMBER });
  const updateState = useCallback(async () => {
    const sanitizedQuery = sanitizeInput(query.trim());
    if (!sanitizedQuery) return;
    setLoading(true);
    try {
      const { data, error } = await searchBooks(sanitizedQuery, limit, page);
      if (error || !data) {
        console.error('API Error:', error);
        return;
      }
      setBooks(data.books);
      setStats({
        ...data.stats,
        totalItems: data.totalItems,
        responseTimeMs: data.responseTimeMs,
      });
      setTotalPages(Math.ceil(data.totalItems / limit));
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  }, [query, limit, page, setBooks, setStats]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedQuery = sanitizeInput(query.trim());
    if (!sanitizedQuery || (sanitizedQuery === lastSearchRef.current.query && limit === lastSearchRef.current.limit))
      return;
    lastSearchRef.current = {
      query: sanitizedQuery,
      limit,
      page: 1,
    };
    setPage(1);
    updateState();
  };
  useEffect(() => {
    if(!loading){  
      updateState();
      }
  }, [page]);

  const handleNext = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="mb-4 flex flex-col sm:flex-row gap-2 items-center"
      >
        <input
          type="text"
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          {PAGINATION_LIST.map((num) => (
            <option key={num} value={num}>
              {num} per page
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      { page!==0 &&
      <Suspense fallback={null}>
        <Pagination
          isLoading={loading}
          page={page}
          handleNext={handleNext}
          handlePrev={handlePrev}
          totalPages={totalPages}
        />
        </Suspense>
      }
    </>
  );
};

export default SearchBar;


