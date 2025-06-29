import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import { ReviewsFeedState, ListMyReviewsPayloadAction, ListFriendReviewsPayloadAction } from "./types";


export const initialState: ReviewsFeedState = {
  isLoading: { myReviews: false, friendReviews: false },
  error: null,
  myReviews: [],
  friendReviews: [],
  lastReviewId: { myReviews: null, friendReviews: null },
  hasMore: { myReviews: true, friendReviews: true },
  activeTab: "myReviews", 
};

const reviewsFeedSlice = createSlice({
  name: "reviewsFeed",
  initialState,
  reducers: {
    setReviewsFeedSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<ReviewsFeedState>
    ) => setStateSliceFieldReducer<ReviewsFeedState>(state, action),
    setReviewsFeedSlice: (
      state,
      action: PayloadAction<Partial<ReviewsFeedState>>
    ) => setStateSliceReducer<ReviewsFeedState>(state, action),
    listMyReviews: (_state, _action: ListMyReviewsPayloadAction) => {},
    listFriendReviews: (_state, _action: ListFriendReviewsPayloadAction) => {},
    resetReviewsFeedSlice: () => initialState,
  },
});

export const {
  setReviewsFeedSliceField,
  setReviewsFeedSlice,
  listMyReviews,
  listFriendReviews,
  resetReviewsFeedSlice,
} = reviewsFeedSlice.actions;
export default reviewsFeedSlice;