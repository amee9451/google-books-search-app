import React, { useRef } from 'react'
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER, PAGINATION_LIST } from '../../constants/Book'
import { SearchFormProps } from '../../types/Books/Book.types'
import { sanitizeInput } from '../../utils/sanitizeInput';
const initialState = { query: '', limit: DEFAULT_PAGE_LIMIT, page: DEFAULT_PAGE_NUMBER };

 const SearchForm=({
  query,
  setQuery,
  limit,
  setLimit,
  loading,
  apiStatus,
  setPage,
  updateState
}: SearchFormProps) =>{
  const lastSearchRef = useRef(initialState);
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
    
const handleKeyPress = (e:React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setPage(1);
      updateState();
    }
  };

  return (
    <div>
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
          onKeyDown={handleKeyPress}
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
                {apiStatus &&
        <p className="text-xs text-red-500 font-medium flex items-center mt-2 px-5">
          Please try Again
        </p>
      }
    </div>
  )
 }

export default SearchForm;
