import { PayloadAction } from "@reduxjs/toolkit";
import { setStateSliceReducer } from "../setStateSliceReducer";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Scenarios {
  initialState: any;
  input: any;
  output: any;
}

const scenarios: Scenarios[] = [
  {
    initialState: {},
    input: {
      foo: "baa",
      key: "value",
    },
    output: {
      foo: "baa",
      key: "value",
    },
  },
  {
    initialState: {
      other: "value",
    },
    input: {
      foo: "baa",
      key: "value",
    },
    output: {
      other: "value",
      foo: "baa",
      key: "value",
    },
  },
  {
    initialState: {
      key: "value",
    },
    input: {
      foo: "baa",
      key: "new value",
    },
    output: {
      foo: "baa",
      key: "new value",
    },
  },
];

describe("Test Set State Slice Function", () => {
  test.each(scenarios)(
    "should change state",
    ({ initialState, input, output }) => {
      const action: PayloadAction<any> = {
        payload: input,
        type: "",
      };
      const result = setStateSliceReducer<any>({ ...initialState }, action);
      expect(result).toEqual(output);
    }
  );
});
