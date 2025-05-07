export type Book = {
    id: string;
    title: string;
    authors: string[];
    year: number;
    isbn: string;
    genres: string[];
    coverUrl: string;
    pages?: number;
    description?: string;
    rating?: number;
  };
  