var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookList from '../BookList';
import SampleData from '../__mocks__/sampleBooks';
// Mock BookItem with proper typing
jest.mock('../BookItem', () => ({
    __esModule: true,
    default: ({ book }) => (_jsxs("div", { "data-testid": "book-item", children: [book.volumeInfo.title, " "] }))
}));
describe('BookList Component', () => {
    it('renders book titles correctly', () => {
        render(_jsx(BookList, { books: SampleData }));
        // Check for partial text matches
        expect(screen.getByText(/The Pragmatic Programmer/)).toBeInTheDocument();
        expect(screen.getByText(/Clean Code/)).toBeInTheDocument();
        // More precise checks using test-id and text content
        const bookItems = screen.getAllByTestId('book-item');
        expect(bookItems[0]).toHaveTextContent('The Pragmatic Programmer');
        expect(bookItems[1]).toHaveTextContent('Clean Code');
    });
    it('renders book titles correctly once', () => {
        render(_jsx(BookList, { books: SampleData }));
        SampleData.forEach(book => {
            const elements = screen.getAllByText(book.volumeInfo.title);
            expect(elements.length).toBe(1);
        });
    });
    it('renders book titles correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(BookList, { books: SampleData }));
        yield expect(screen.findByText('The Pragmatic Programmer')).resolves.toBeInTheDocument();
        yield expect(screen.findByText('Clean Code')).resolves.toBeInTheDocument();
    }));
    it('passes correct book data to BookItems', () => {
        render(_jsx(BookList, { books: SampleData }));
        const bookItems = screen.getAllByTestId('book-item');
        expect(bookItems[0]).toHaveTextContent(SampleData[0].volumeInfo.title);
        expect(bookItems[1]).toHaveTextContent(SampleData[1].volumeInfo.title);
    });
    it('matches snapshot with books', () => {
        const { asFragment } = render(_jsx(BookList, { books: mockBooks }));
        expect(asFragment()).toMatchSnapshot();
    });
    const mockBooks = SampleData;
    it('displays correct number of books', () => {
        render(_jsx(BookList, { books: mockBooks }));
        const bookItems = screen.getAllByTestId('book-item');
        expect(bookItems).toHaveLength(2);
    });
});
