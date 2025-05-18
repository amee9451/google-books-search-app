import React, { useState, useCallback, Suspense } from 'react';
import SearchBar from './components/Books/SearchBar';
import { Book, Stats } from './types/Books/Book.types';
const StatsPanel = React.lazy(() => import('./components/Books/StatsPanel'));
const BookList = React.lazy(() => import('./components/Books/BookList'));

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  // Memoize handlers to avoid unnecessary re-renders in children
  const handleSetBooks = useCallback((newBooks: Book[]) => {
    setBooks(newBooks);
  }, []);

  const handleSetStats = useCallback((newStats: Stats | null) => {
    setStats(newStats);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">📚 Google Books Search</h1>
        <SearchBar setStats={handleSetStats} setBooks={handleSetBooks} />
        <Suspense fallback={null}>
          <StatsPanel stats={stats} />
        </Suspense>
        <Suspense fallback={null}>
          <BookList books={books} />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
