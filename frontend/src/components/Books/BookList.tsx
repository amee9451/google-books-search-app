import React from 'react';
import BookItem from './BookItem';
import { BookListProps } from '../../types/Books/Book.types';


const BookList: React.FC<BookListProps> = ({ books }) => {
  return (    
    <div className="space-y-4">
      {books.map((book, index) => (
          <BookItem key={index} book={book} />
      ))}
    </div>
  );
};

export default BookList;
