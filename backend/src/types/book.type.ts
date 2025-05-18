export type ImageLinks = {
  thumbnail?: string;
  smallThumbnail?: string;
};

export type VolumeInfo = {
  title: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  publisher?: string;
  imageLinks?: ImageLinks;
  previewLink?: string;
  [key: string]: any; // for flexibility
};

export type SaleInfo = {
  listPrice?: {
    amount?: number | string;
  };
};

export type BookApiResponse = {
  id: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
};

export type BookItem = {
  title: string;
  authors: string[];
  publishedDate: string;
  description: string;
  publisher: string;
  smallThumbnail: string;
  previewLink: string;
  listPriceAmount: number | string;
};

export type Stats = {
  mostFrequentAuthor?: string;
  earliestPublishedYear?: string;
  latestPublishedYear?: string;
  totalItems?: number;
  responseTimeMs?: number;
};

export type BooksApiResult = {
  items: BookApiResponse[];
  totalItems: number;
};
