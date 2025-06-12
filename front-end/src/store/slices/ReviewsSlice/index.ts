import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import {
  ReviewsState,
  GetReviewPayloadAction,
  ListReviewsByBookPayloadAction,
  CreateReviewPayloadAction,
} from "./types";

export const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
  selectedReview: null,
  createReviewError: null,
  createReviewSuccess: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReviewSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<ReviewsState>
    ) => setStateSliceFieldReducer<ReviewsState>(state, action),
    setReviewSlice: (state, action: PayloadAction<Partial<ReviewsState>>) =>
      setStateSliceReducer<ReviewsState>(state, action),
    getReview: (_state, _action: GetReviewPayloadAction) => {},
    listReviewsByBook: (_state, _action: ListReviewsByBookPayloadAction) => {},
    createReview: (_state, _action: CreateReviewPayloadAction) => {},
    resetReviewSlice: () => initialState,
  },
});

export const {
  setReviewSliceField,
  setReviewSlice,
  getReview,
  listReviewsByBook,
  createReview,
  resetReviewSlice,
} = reviewSlice.actions;
export default reviewSlice;
