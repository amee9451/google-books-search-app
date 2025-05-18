import React, { useEffect, useState } from 'react';
import { BookItemProps } from '../../types/Books/Book.types';
import {
  UNNOWN_AUTHOR,
  FALLBACK_IMAGE_URL,
  PRIVIEW_THIS_BOOK,
  DESCRIPTION,
} from '../../constants/Book';
const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    setExpanded(false);
  }, [book]);

  const formatAuthorsNested = (authors: string[]): string => {
    if (!authors?.length) return UNNOWN_AUTHOR;
    const wrapNested = (index: number): string =>
      index === authors.length - 1
        ? authors[index]
        : `${authors[index]} [,${wrapNested(index + 1)}]`;
    return wrapNested(0);
  };

  return (
    <div className="border border-gray-400 p-4 mb-6 bg-white max-w-6xl mx-auto text-sm text-gray-800">
      {/* Top Line: Title and Author */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-left w-full font-semibold text-black mb-2"
      >
        <span className="font-bold">{formatAuthorsNested(book.authors ?? [])}</span> — {book.title}
      </button>
      {expanded && (
        <>
          {/* Image + Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start mb-4">
            {/* Book Cover */}
            <div className="sm:col-span-1">
              <img
                src={book.smallThumbnail || FALLBACK_IMAGE_URL}
                alt={book.title}
                className="w-32 h-44  object-cover border"
              />
            </div>

            {/* Metadata */}
            <div className="sm:col-span-3 space-y-1">
              {book.publishedDate && (
                <p data-testid="published-date">
                  <strong>Published: {book.publishedDate}</strong>
                </p>
              )}
              {book.publisher && (
                <p data-testid="publisher">
                  <strong>Publisher: {book.publisher}</strong>
                </p>
              )}
              {typeof book.listPriceAmount === 'number' && (
                <p data-testid="book-price">
                  <strong>Price:</strong>
                  {`$${book.listPriceAmount.toFixed(2)}`}
                </p>
              )}
              {book.previewLink && (
                <a
                  data-testid="preview-link"
                  href={book.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {PRIVIEW_THIS_BOOK}
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="border-t pt-3">
            <h3 className="font-semibold mb-1">{DESCRIPTION}</h3>
            <p data-testid="book-description" className="leading-relaxed text-gray-700">
              {book.description || 'No description available.'}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default BookItem;
