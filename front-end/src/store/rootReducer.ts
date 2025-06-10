import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import userSlice from "./slices/UserSlice";
import loginSlice from "./slices/LoginSlice";
import signUpSlice from "./slices/SignUpSlice";
import authSlice from "./slices/Auth";
import bookSlice from "./slices/BooksSlice";
import reviewSlice from "./slices/ReviewsSlice";

const appReducer = combineReducers({
  userSlice: userSlice.reducer,
  loginSlice: loginSlice.reducer,
  signUpSlice: signUpSlice.reducer,
  authSlice: authSlice.reducer,
  bookSlice: bookSlice.reducer,
  reviewSlice: reviewSlice.reducer,
});

const rootReducer: Reducer<ReturnType<typeof appReducer>, AnyAction> = (
  state,
  action
) => {
  return appReducer(state, action);
};

export type RootCombinedReducer = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<RootCombinedReducer> =
  useSelector;

export default rootReducer;
