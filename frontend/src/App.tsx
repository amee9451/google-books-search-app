import React, { useState } from 'react';
import SearchBar from './components/Books/SearchBar';
import BookList from './components/Books/BookList';
import StatsPanel from './components/Books/StatsPanel';
import { Book,BookApiResponse,Stats } from './types/BookList.types';
const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">📚 Google Books Search</h1>
          <SearchBar setStats={setStats} setBooks={setBooks}/>
          <StatsPanel stats={stats} />
          <BookList books={books} />
        </div>
      </div>
  );
};

export default App;
