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
} from "./types";

export const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
  selectedReview: null,
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
  },
});

export const {
  setReviewSliceField,
  setReviewSlice,
  getReview,
  listReviewsByBook,
} = reviewSlice.actions;
export default reviewSlice;
