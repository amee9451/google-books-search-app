var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER, PAGINATION_LIST } from '../../constants/Book';
import { sanitizeInput } from '../../utils/sanitizeInput';
const initialState = { query: '', limit: DEFAULT_PAGE_LIMIT, page: DEFAULT_PAGE_NUMBER };
const SearchForm = ({ query, setQuery, limit, setLimit, loading, apiStatus, setPage, updateState }) => {
    const lastSearchRef = useRef(initialState);
    const handleSearch = (e) => __awaiter(void 0, void 0, void 0, function* () {
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
    });
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setPage(1);
            updateState();
        }
    };
    return (_jsxs("div", { children: [_jsxs("form", { onSubmit: handleSearch, className: "mb-4 flex flex-col sm:flex-row gap-2 items-center", children: [_jsx("input", { type: "text", className: "w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500", placeholder: "Search for books...", value: query, onChange: (e) => setQuery(e.target.value), onKeyDown: handleKeyPress }), _jsx("select", { value: limit, onChange: (e) => setLimit(Number(e.target.value)), className: "border px-3 py-2 rounded", children: PAGINATION_LIST.map((num) => (_jsxs("option", { value: num, children: [num, " per page"] }, num))) }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700", disabled: loading, children: loading ? 'Searching...' : 'Search' })] }), apiStatus &&
                _jsx("p", { className: "text-xs text-red-500 font-medium flex items-center mt-2 px-5", children: "Please try Again" })] }));
};
export default SearchForm;
