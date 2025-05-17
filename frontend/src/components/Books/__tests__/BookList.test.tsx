import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookList from '../BookList';
import { Book } from '../../../types/Books/Book.types';
import SampleData from '../__mocks__/sampleBooks';

// Mock BookItem with proper typing
jest.mock('../BookItem', () => ({ 
  __esModule: true,
  default: ({ book }: { book: typeof SampleData[0] }) => (
    <div data-testid="book-item">
      {book.volumeInfo.title} {/* Removed authors */}
    </div>
  )
}));

describe('BookList Component', () => {
  it('renders book titles correctly', () => {
  render(<BookList books={SampleData} />);
  
  // Check for partial text matches
  expect(screen.getByText(/The Pragmatic Programmer/)).toBeInTheDocument();
  expect(screen.getByText(/Clean Code/)).toBeInTheDocument();
  
  // More precise checks using test-id and text content
  const bookItems = screen.getAllByTestId('book-item');
  expect(bookItems[0]).toHaveTextContent('The Pragmatic Programmer');
  expect(bookItems[1]).toHaveTextContent('Clean Code');
  });
it('renders book titles correctly once', () => {
  render(<BookList books={SampleData} />);
  SampleData.forEach(book => {
    const elements = screen.getAllByText(book.volumeInfo.title);
    expect(elements.length).toBe(1); 
  });
});
  
  it('renders book titles correctly', async () => {
  render(<BookList books={SampleData} />);
  
  await expect(screen.findByText('The Pragmatic Programmer')).resolves.toBeInTheDocument();
  await expect(screen.findByText('Clean Code')).resolves.toBeInTheDocument();
  });
  it('passes correct book data to BookItems', () => {
  render(<BookList books={SampleData} />);
  const bookItems = screen.getAllByTestId('book-item');
  
  expect(bookItems[0]).toHaveTextContent(SampleData[0].volumeInfo.title);
  expect(bookItems[1]).toHaveTextContent(SampleData[1].volumeInfo.title);
  });
  it('matches snapshot with books', () => {
    const { asFragment } = render(<BookList books={mockBooks} />);
    expect(asFragment()).toMatchSnapshot();
  });
  const mockBooks: Book[] = SampleData;
  it('displays correct number of books', () => {
    render(<BookList books={mockBooks} />);
    const bookItems = screen.getAllByTestId('book-item');
    expect(bookItems).toHaveLength(2);
  });
});