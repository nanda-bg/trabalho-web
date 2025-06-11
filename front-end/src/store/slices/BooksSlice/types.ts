import { PayloadAction } from "@reduxjs/toolkit";

export interface BooksState {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  selectedBook: Book | null;
}

export type GetBookPayloadAction = PayloadAction<{
  uid: string;
}>;

export interface Book {
  bookId: string;
  title: string;
  description: string;
  authors: string[];
  coverUrl: string;
  publicationYear: number;
  genre: string;
  averageRating: number;
  ratingsCount: number;
  pagesCount: number;
}
