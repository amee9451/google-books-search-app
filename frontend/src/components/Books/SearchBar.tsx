import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { sanitizeInput } from '../../utils/sanitizeInput';
import { SearchBarProps } from '../../types/Books/Book.types';
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from '../../constants/Book';
import { searchBooks } from '../../services/googleBooks';
import SearchForm from './SearchForm';

const Pagination = React.lazy(() => import('./Pagination'));

const INITIAL_STATE = {
  query: '',
  limit: DEFAULT_PAGE_LIMIT,
  page: DEFAULT_PAGE_NUMBER,
};

const SearchBar: React.FC<SearchBarProps> = ({ setBooks, setStats }) => {
  const [query, setQuery] = useState(INITIAL_STATE.query);
  const [limit, setLimit] = useState(INITIAL_STATE.limit);
  const [page, setPage] = useState(INITIAL_STATE.page);
  const [totalPages, setTotalPages] = useState(DEFAULT_PAGE_NUMBER);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setAPIStatus] = useState(false);
  const queryRef = useRef('');

  const updateState = useCallback(async () => {
    const sanitizedQuery = sanitizeInput(query.trim());
    if (!sanitizedQuery) return;

    queryRef.current = sanitizedQuery;
    setLoading(true);

    try {
      const { data, error } = await searchBooks(sanitizedQuery, limit, page);

      if (error || !data) {
        setAPIStatus(true);
        return;
      }

      setAPIStatus(false);
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

  useEffect(() => {
    // only fetch if user has already submitted a query
    if (queryRef.current && !loading) {
      updateState();
    }
  }, [page]);

  const showPagination = totalPages > 1;

  return (
    <>
      <SearchForm
        query={query}
        setQuery={setQuery}
        limit={limit}
        setLimit={setLimit}
        loading={loading}
        apiStatus={apiStatus}
        setPage={setPage}
        updateState={updateState}
      />

      {showPagination && (
        <Suspense fallback={null}>
          <Pagination isLoading={loading} page={page} totalPages={totalPages} setPage={setPage} />
        </Suspense>
      )}
    </>
  );
};

export default SearchBar;
