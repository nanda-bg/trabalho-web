import { PayloadAction } from "@reduxjs/toolkit";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SetStateSliceFieldReducerProps<T> {
  key: keyof T;
  value: any;
}

export type SetStateSliceFieldReducerPayload<T> = PayloadAction<
  SetStateSliceFieldReducerProps<T>
>;

export const setStateSliceFieldReducer = <T>(
  state: T,
  action: SetStateSliceFieldReducerPayload<T>
) => {
  state[action.payload.key] = action.payload.value;
  return state;
};
