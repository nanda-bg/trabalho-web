import { PayloadAction } from "@reduxjs/toolkit";

export const setStateSliceReducer = <T>(
  state: T,
  action: PayloadAction<Partial<T>>
) => {
  return {
    ...state,
    ...action.payload,
  };
};
