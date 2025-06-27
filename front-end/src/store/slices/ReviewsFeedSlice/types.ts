import { Review } from "@app/types/Review";
import { PayloadAction } from "@reduxjs/toolkit";

export interface ReviewsFeedState {
  isLoading: { myReviews: boolean; friendReviews: boolean };
  error: string | null;
  myReviews: Review[];
  friendReviews: Review[];
  lastReviewId: { myReviews: string | null; friendReviews: string | null };
  hasMore: { myReviews: boolean; friendReviews: boolean };
}

export type ListMyReviewsPayloadAction = PayloadAction<{
  userId: string;
}>;

export type ListFriendReviewsPayloadAction = PayloadAction<{}>;