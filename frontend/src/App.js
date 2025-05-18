import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import SearchBar from './components/Books/SearchBar';
import BookList from './components/Books/BookList';
import StatsPanel from './components/Books/StatsPanel';
const App = () => {
    const [books, setBooks] = useState([]);
    const [stats, setStats] = useState(null);
    return (_jsx("div", { className: "min-h-screen bg-gray-50 px-4 py-8", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-center", children: "\uD83D\uDCDA Google Books Search" }), _jsx(SearchBar, { setStats: setStats, setBooks: setBooks }), _jsx(StatsPanel, { stats: stats }), _jsx(BookList, { books: books })] }) }));
};
export default App;
