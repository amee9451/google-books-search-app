import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { UNNOWN_AUTHOR, FALLBACK_IMAGE_URL, PRIVIEW_THIS_BOOK, DESCRIPTION } from '../../constants/Book';
const BookItem = ({ book }) => {
    var _a;
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        setExpanded(false);
    }, [book]);
    const formatAuthorsNested = (authors) => {
        if (!(authors === null || authors === void 0 ? void 0 : authors.length))
            return UNNOWN_AUTHOR;
        const wrapNested = (index) => index === authors.length - 1
            ? authors[index]
            : `${authors[index]} [,${wrapNested(index + 1)}]`;
        return wrapNested(0);
    };
    return (_jsxs("div", { className: "border border-gray-400 p-4 mb-6 bg-white max-w-6xl mx-auto text-sm text-gray-800", children: [_jsxs("button", { onClick: () => setExpanded(!expanded), className: "text-left w-full font-semibold text-black mb-2", children: [_jsx("span", { className: "font-bold", children: formatAuthorsNested((_a = book.authors) !== null && _a !== void 0 ? _a : []) }), " \u2014 ", book.title] }), expanded && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-4 items-start mb-4", children: [_jsx("div", { className: "sm:col-span-1", children: _jsx("img", { src: book.smallThumbnail || FALLBACK_IMAGE_URL, alt: book.title, className: "w-32 h-44  object-cover border" }) }), _jsxs("div", { className: "sm:col-span-3 space-y-1", children: [book.publishedDate && _jsx("p", { "data-testid": "published-date", children: _jsxs("strong", { children: ["Published: ", book.publishedDate] }) }), book.publisher && _jsx("p", { "data-testid": "publisher", children: _jsxs("strong", { children: ["Publisher: ", book.publisher] }) }), typeof book.listPriceAmount === 'number' &&
                                        _jsxs("p", { "data-testid": "book-price", children: [_jsx("strong", { children: "Price:" }), `$${book.listPriceAmount.toFixed(2)}`] }), book.previewLink &&
                                        _jsx("a", { "data-testid": "preview-link", href: book.previewLink, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 underline hover:text-blue-800", children: PRIVIEW_THIS_BOOK })] })] }), _jsxs("div", { className: "border-t pt-3", children: [_jsx("h3", { className: "font-semibold mb-1", children: DESCRIPTION }), _jsx("p", { "data-testid": "book-description", className: "leading-relaxed text-gray-700", children: book.description || 'No description available.' })] })] }))] }));
};
export default BookItem;
