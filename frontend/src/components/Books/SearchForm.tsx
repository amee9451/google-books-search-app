import React, { useCallback } from 'react';
import { DEFAULT_PAGE_NUMBER, PAGINATION_LIST } from '../../constants/Book';
import { SearchFormProps } from '../../types/Books/Book.types';
import { sanitizeInput } from '../../utils/sanitizeInput';

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  setQuery,
  limit,
  setLimit,
  loading,
  apiStatus,
  setPage,
  updateState,
}) => {
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const sanitizedQuery = sanitizeInput(query.trim());
      if (!sanitizedQuery) return;

      setPage(DEFAULT_PAGE_NUMBER);
      updateState();
    },
    [query, limit, setPage, updateState]
  );

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="mb-4 flex flex-col sm:flex-row gap-2 items-center"
        role="search"
        aria-label="Search books"
      >
        <label htmlFor="search-input" className="sr-only">
          Search for books
        </label>
        <input
          id="search-input"
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
          aria-label="Select results per page"
        >
          {PAGINATION_LIST.map((num) => (
            <option key={num} value={num}>
              {num} per page
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {apiStatus && <p className="text-xs text-red-500 font-medium mt-2 px-5">Please try again.</p>}
    </div>
  );
};

export default SearchForm;
