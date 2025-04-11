export type Book = {
    id: string;
    title: string;
    authors: string[];
    year: number;
    isbn: string;
    genre: string;
    coverUrl: string;
    pages?: number;
    description?: string;
  };
  