export type BookItemProps = {
  book: Book;
};

export type BookListProps = {
  books: Book[];
};

export type StatsPanelProps = {
  stats: Stats | null;
};

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
export type Stats = {
  mostFrequentAuthor?: string;
  earliestPublishedYear?: string;
  latestPublishedYear?: string;
  totalItems?: number;
  responseTimeMs?: number;
};

export type BookApiResponse = {
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
};

export type SearchResponse = {
  kind: string;
  totalItems: number;
  items: BookApiResponse[];
  books?: Book[];
};

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

export type SearchStats = {
  totalItems: number;
  responseTimeMs: number;
  [key: string]: any;
};

export type BackendSearchResponse = {
  books: Book[];
  stats: SearchStats;
  totalItems: number;
  responseTimeMs: number;
};
export type SearchBarProps = {
  setBooks: (books: Book[]) => void;
  setStats: (stats: SearchStats) => void;
};

export type PaginationProps = {
  isLoading: boolean;
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export type SearchFormProps = {
  query: string;
  setQuery: (value: string) => void;
  limit: number;
  setLimit: (value: number) => void;
  loading: boolean;
  apiStatus: boolean;
  setPage: (value: number) => void;
  updateState: () => void;
};
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
export type StatItem = {
  key: keyof StatsPanelProps['stats'] | string;
  label: string;
  required?: boolean;
  formatter: (value: any) => string;
};
