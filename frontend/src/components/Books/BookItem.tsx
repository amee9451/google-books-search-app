import React, { useEffect, useState, useMemo } from 'react';
import { BookItemProps } from '../../types/Books/Book.types';
import {
  UNKNOWN_AUTHOR,
  FALLBACK_IMAGE_URL,
  PREVIEW_THIS_BOOK,
  DESCRIPTION,
} from '../../constants/Book';

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [book]);

  // Memoize formatted authors to avoid recomputation
  const formattedAuthors = useMemo(() => {
    const authors = book.authors ?? [];
    if (authors.length === 0) return UNKNOWN_AUTHOR;
    const wrapNested = (index: number): string =>
      index === authors.length - 1
        ? authors[index]
        : `${authors[index]} [,${wrapNested(index + 1)}]`;
    return wrapNested(0);
  }, [book.authors]);

  return (
    <div className="border border-gray-400 p-4 mb-6 bg-white max-w-6xl mx-auto text-sm text-gray-800">
      {/* Top Line: Title and Author */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="text-left w-full font-semibold text-black mb-2"
      >
        <span className="font-bold">{formattedAuthors}</span> — {book.title}
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
                className="w-32 h-44 object-cover border"
                loading="lazy"
              />
            </div>

            {/* Metadata */}
            <div className="sm:col-span-3 space-y-1">
              {book.publishedDate && (
                <p data-testid="published-date">
                  <strong>Published:</strong> {book.publishedDate}
                </p>
              )}
              {book.publisher && (
                <p data-testid="publisher">
                  <strong>Publisher:</strong> {book.publisher}
                </p>
              )}
              {typeof book.listPriceAmount === 'number' && (
                <p data-testid="book-price">
                  <strong>Price:</strong> ${book.listPriceAmount.toFixed(2)}
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
                  {PREVIEW_THIS_BOOK}
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

export default React.memo(BookItem);