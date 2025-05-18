import React, { useCallback } from 'react';
import { PaginationProps } from '../../types/Books/Book.types';

const Pagination: React.FC<PaginationProps> = ({ isLoading, page, totalPages, setPage }) => {
  const handleNext = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  return (
    <div className="flex justify-center items-center mt-4 mb-4">
      <button
        onClick={handlePrev}
        disabled={isLoading || page <= 1}
        className="px-4 py-2 bg-gray-300 rounded-l disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-white border-t border-b">{`Page ${page} of ${totalPages}`}</span>
      <button
        onClick={handleNext}
        disabled={isLoading || page >= totalPages}
        className="px-4 py-2 bg-gray-300 rounded-r disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
