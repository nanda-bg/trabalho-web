import { Review } from "@app/types/Review";
import { PayloadAction } from "@reduxjs/toolkit";

export interface ReviewsByUserState {
  reviewsByUser: Review[];
  isLoading: boolean;
  error: string | null;
}

export type ListReviewsByUserPayloadAction = PayloadAction<{
  userId: string;
}>;

