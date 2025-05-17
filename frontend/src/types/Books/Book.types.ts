export interface BookItemProps {
  book: Book
}

export interface BookListProps {
  books: Book[];
}

export interface StatsPanelProps {
  stats: Stats | null;
}

export interface Book {
  title: string;
  authors: string[];
  publishedDate: string;
  description: string;
  publisher: string;
  smallThumbnail: string;
  previewLink: string;
  listPriceAmount: number;
}
export interface Stats {
  mostFrequentAuthor?: string;
  earliestPublishedYear?: string;
  latestPublishedYear?: string;
  totalItems?: number;
  responseTimeMs?: number;
}

export interface BookApiResponse {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    [key: string]: any;
  };
}

export interface SearchResponse {
  kind: string;
  totalItems: number;
  items: BookApiResponse[];
  books?:Book[]
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    [key: string]: any;
  };
}

export interface SearchStats {
  totalItems: number;
  responseTimeMs: number;
  [key: string]: any;
}

export interface BackendSearchResponse {
  books: Book[];
  stats: SearchStats;
  totalItems: number;
  responseTimeMs: number;
}
export interface SearchBarProps {
  setBooks: (books: Book[]) => void;
  setStats: (stats: SearchStats) => void;
}

export interface PaginationProps {
  isLoading: boolean;
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface SearchFormProps {
  query: string
  setQuery: (value: string) => void
  limit: number
  setLimit: (value: number) => void
  loading: boolean
  apiStatus: boolean,
  setPage: (value: number) => void
  updateState:()=>void
}