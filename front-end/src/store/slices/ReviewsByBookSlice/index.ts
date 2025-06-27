import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import {
  ReviewsByBookState,
  GetReviewPayloadAction,
  ListReviewsByBookPayloadAction,
  CreateReviewPayloadAction,
} from "./types";

export const initialState: ReviewsByBookState = {
  reviewsByBook: [],
  isLoading: false,
  error: null,
  selectedReview: null,
  createReviewError: null,
  createReviewSuccess: false,
};

const reviewsByBookSlice = createSlice({
  name: "reviewsByBook",
  initialState,
  reducers: {
    setReviewsByBookSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<ReviewsByBookState>
    ) => setStateSliceFieldReducer<ReviewsByBookState>(state, action),
    setReviewsByBookSlice: (
      state,
      action: PayloadAction<Partial<ReviewsByBookState>>
    ) => setStateSliceReducer<ReviewsByBookState>(state, action),
    getReview: (_state, _action: GetReviewPayloadAction) => {},
    listReviewsByBook: (_state, _action: ListReviewsByBookPayloadAction) => {},
    createReview: (_state, _action: CreateReviewPayloadAction) => {},
    resetReviewsByBookSlice: () => initialState,
  },
});

export const {
  setReviewsByBookSliceField,
  setReviewsByBookSlice,
  getReview,
  listReviewsByBook,
  createReview,
  resetReviewsByBookSlice,
} = reviewsByBookSlice.actions;
export default reviewsByBookSlice;
