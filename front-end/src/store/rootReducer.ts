import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import userSlice from "./slices/UserSlice";
import loginSlice from "./slices/LoginSlice";
import signUpSlice from "./slices/SignUpSlice";

const appReducer = combineReducers({
  userSlice: userSlice.reducer,
  loginSlice: loginSlice.reducer,
  signUpSlice: signUpSlice.reducer,
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
