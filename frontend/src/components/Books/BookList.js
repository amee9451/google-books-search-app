import { jsx as _jsx } from "react/jsx-runtime";
import BookItem from './BookItem';
const BookList = ({ books }) => {
    return (_jsx("div", { className: "space-y-4", children: books.map((book, index) => (_jsx(BookItem, { book: book }, index))) }));
};
export default BookList;
