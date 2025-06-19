import { Review } from "@app/types/Review";
import { PayloadAction } from "@reduxjs/toolkit";

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
