import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import { ReviewsState } from "./types";

export const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
  selectedReview: null,
  createReviewError: null,
  createReviewSuccess: false,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviewsSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<ReviewsState>
    ) => setStateSliceFieldReducer<ReviewsState>(state, action),
    setReviewsSlice: (state, action: PayloadAction<Partial<ReviewsState>>) =>
      setStateSliceReducer<ReviewsState>(state, action),
    listReviews: () => {},
    resetReviewsSlice: () => initialState,
  },
});

export const {
  setReviewsSliceField,
  setReviewsSlice,
  listReviews,
  resetReviewsSlice,
} = reviewsSlice.actions;
export default reviewsSlice;
