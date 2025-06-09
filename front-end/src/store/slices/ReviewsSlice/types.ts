import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../UserSlice/types";
import { Book } from "../BooksSlice/types";

export interface ReviewsState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  selectedReview: Review | null;
}

export type GetReviewPayloadAction = PayloadAction<{
  uid: string;
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
