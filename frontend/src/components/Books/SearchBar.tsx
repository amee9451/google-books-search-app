import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { sanitizeInput } from '../../utils/sanitizeInput';
import { SearchBarProps } from '../../types/Books/Book.types';
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_NUMBER,
} from '../../constants/Book';
import { searchBooks } from '../../services/googleBooks';
import SearchForm from './SearchForm';

const Pagination = React.lazy(() => import('./Pagination'));

const SearchBar: React.FC<SearchBarProps> = ({ setBooks, setStats }) => {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(DEFAULT_PAGE_NUMBER);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setAPIStatus] = useState(false);
  const INITIAL_STATE = { query: '', limit: DEFAULT_PAGE_LIMIT, page: DEFAULT_PAGE_NUMBER };
  const lastSearchRef = useRef(INITIAL_STATE);


  const updateState = useCallback(async () => {
    const sanitizedQuery = sanitizeInput(query.trim());
    if (!sanitizedQuery) return;
    setLoading(true);
    try {
        const { data, error } = await searchBooks(sanitizedQuery, limit, page);
        if (error || !data) {
          lastSearchRef.current = INITIAL_STATE;
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
    if(!loading){  
      updateState();
      }
  }, [page]);
  const searchFormProps = {
    query,
    setQuery,
    limit,
    setLimit,
    loading,
    apiStatus,
    setPage,
    updateState
  };
  return (
    <>
      <SearchForm {...searchFormProps}/>
      { totalPages >1 &&
      <Suspense fallback={null}>
        <Pagination
            isLoading={loading}
            page={page}
            totalPages={totalPages}
            setPage={ setPage}
        />
      </Suspense>
      }
    </>
  );
};

export default SearchBar;


