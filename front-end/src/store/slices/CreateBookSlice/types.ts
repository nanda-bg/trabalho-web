import { PayloadAction } from "@reduxjs/toolkit";

export interface CreateBookState {
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

export type CreateBookPayloadAction = PayloadAction<{
  title: string;
  description: string;
  authors: string[];
  coverUrl: string;
  publicationYear: number;
  genre: string;
  pagesCount: number;
}>;
