import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  setStateSliceFieldReducer,
  SetStateSliceFieldReducerPayload,
} from "../../utils/setStateSliceFieldReducer";
import { setStateSliceReducer } from "../../utils/setStateSliceReducer";
import { CreateBookPayloadAction, CreateBookState } from "./types";

export const initialState: CreateBookState = {
  isLoading: false,
  error: null,
  success: null,
};

const createBookSlice = createSlice({
  name: "createBook",
  initialState,
  reducers: {
    setCreateBookSliceField: (
      state,
      action: SetStateSliceFieldReducerPayload<CreateBookState>
    ) => setStateSliceFieldReducer<CreateBookState>(state, action),
    setCreateBookSlice: (state, action: PayloadAction<Partial<CreateBookState>>) =>
      setStateSliceReducer<CreateBookState>(state, action),
    createBook: (_state, _action: CreateBookPayloadAction) => {},
    resetCreateBookSlice: () => initialState,
  },
});

export const { setCreateBookSliceField, setCreateBookSlice, createBook, resetCreateBookSlice } =
  createBookSlice.actions;
export default createBookSlice;
