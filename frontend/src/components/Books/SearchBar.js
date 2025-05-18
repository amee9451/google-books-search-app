var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense, useCallback, useEffect, useRef, useState, } from 'react';
import { sanitizeInput } from '../../utils/sanitizeInput';
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER, } from '../../constants/Book';
import { searchBooks } from '../../services/googleBooks';
import SearchForm from './SearchForm';
const Pagination = React.lazy(() => import('./Pagination'));
const SearchBar = ({ setBooks, setStats }) => {
    const [query, setQuery] = useState('');
    const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(DEFAULT_PAGE_NUMBER);
    const [loading, setLoading] = useState(false);
    const [apiStatus, setAPIStatus] = useState(false);
    const INITIAL_STATE = { query: '', limit: DEFAULT_PAGE_LIMIT, page: DEFAULT_PAGE_NUMBER };
    const lastSearchRef = useRef(INITIAL_STATE);
    const updateState = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        const sanitizedQuery = sanitizeInput(query.trim());
        if (!sanitizedQuery)
            return;
        setLoading(true);
        try {
            const { data, error } = yield searchBooks(sanitizedQuery, limit, page);
            if (error || !data) {
                lastSearchRef.current = INITIAL_STATE;
                setAPIStatus(true);
                return;
            }
            setAPIStatus(false);
            setBooks(data.books);
            setStats(Object.assign(Object.assign({}, data.stats), { totalItems: data.totalItems, responseTimeMs: data.responseTimeMs }));
            setTotalPages(Math.ceil(data.totalItems / limit));
        }
        catch (err) {
            console.error('Search failed:', err);
        }
        finally {
            setLoading(false);
        }
    }), [query, limit, page, setBooks, setStats]);
    useEffect(() => {
        if (!loading) {
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
    return (_jsxs(_Fragment, { children: [_jsx(SearchForm, Object.assign({}, searchFormProps)), totalPages > 1 &&
                _jsx(Suspense, { fallback: null, children: _jsx(Pagination, { isLoading: loading, page: page, totalPages: totalPages, setPage: setPage }) })] }));
};
export default SearchBar;
