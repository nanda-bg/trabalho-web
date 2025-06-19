import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import { ReviewsByUserState, ListReviewsByUserPayloadAction } from "./types";

export const initialState: ReviewsByUserState = {
  reviewsByUser: [],
  isLoading: false,
  error: null,
};

const reviewsByUserlice = createSlice({
  name: "reviewsByUser",
  initialState,
  reducers: {
    setReviewsByUserliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<ReviewsByUserState>
    ) => setStateSliceFieldReducer<ReviewsByUserState>(state, action),
    setReviewsByUserlice: (state, action: PayloadAction<Partial<ReviewsByUserState>>) =>
      setStateSliceReducer<ReviewsByUserState>(state, action),
    listReviewsByUser: (_state, _action: ListReviewsByUserPayloadAction) => {},
    resetReviewsByUserlice: () => initialState,
  },
});

export const {
  setReviewsByUserliceField,
  setReviewsByUserlice,
  listReviewsByUser,
  resetReviewsByUserlice,
} = reviewsByUserlice.actions;
export default reviewsByUserlice;
