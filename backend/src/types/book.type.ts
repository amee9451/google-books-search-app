export interface ImageLinks {
  smallThumbnail?: string;
}

export interface VolumeInfo {
  title: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  publisher?: string;
  imageLinks?: ImageLinks;
  previewLink?: string;
}

export interface SaleInfo {
  listPrice?: {
    amount?: number | string;
  };
}

export interface BookItem {
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
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
  saleInfo: SaleInfo;
  totalItems: number;
}
export interface Stats {
  mostFrequentAuthor?: string;
  earliestPublishedYear?: string;
  latestPublishedYear?: string;
  totalItems?: number;
  responseTimeMs?: number;
}
export interface BooksApiResult {
  items: BookApiResponse[];
  totalItems: number;
}