import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../UserSlice/types";
import { Book } from "@app/types/Book";

export interface ReviewsState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  selectedReview: Review | null;
  createReviewError: string | null;
  createReviewSuccess: boolean;
}

export type GetReviewPayloadAction = PayloadAction<{
  uid: string;
}>;

export type CreateReviewPayloadAction = PayloadAction<{
  bookId: string;
  rating: number;
  reviewText: string;
  spoiler: boolean;
}>;

export type ListReviewsByBookPayloadAction = PayloadAction<{
  bookId: string;
}>;

export interface Review {
  reviewId: string;
  userUid: string;
  bookId: string;
  rating: number;
  reviewText: string;
  date: string;
  likeCount: number;
  spoiler: boolean;
  user: User;
  book: Book;
}
