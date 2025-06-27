import { Review } from "@app/types/Review";

export interface ReviewsState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  selectedReview: Review | null;
  createReviewError: string | null;
  createReviewSuccess: boolean;
}
