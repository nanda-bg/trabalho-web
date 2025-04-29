import {
  SetStateSliceFieldReducerPayload,
  SetStateSliceFieldReducerProps,
  setStateSliceFieldReducer,
} from "../setStateSliceFieldReducer";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Scenarios {
  initialState: any;
  input: SetStateSliceFieldReducerProps<any>;
  output: Record<string, any>;
}

const scenarios: Scenarios[] = [
  {
    initialState: {},
    input: {
      key: "foo",
      value: "new value",
    },
    output: {
      foo: "new value",
    },
  },
  {
    initialState: {
      foo: "baa",
    },
    input: {
      key: "foo",
      value: "new value",
    },
    output: {
      foo: "new value",
    },
  },
  {
    initialState: {
      foo: 1,
    },
    input: {
      key: "foo",
      value: "new value",
    },
    output: {
      foo: "new value",
    },
  },
  {
    initialState: {
      foo: 1,
    },
    input: {
      key: "foo",
      value: {
        foo: "baa",
      },
    },
    output: {
      foo: {
        foo: "baa",
      },
    },
  },
];

describe("Test Set State Slice Field Function", () => {
  test.each(scenarios)(
    "should change state",
    ({ initialState, input, output }) => {
      const action: SetStateSliceFieldReducerPayload<any> = {
        payload: input,
        type: "",
      };
      const result = setStateSliceFieldReducer<any>(
        { ...initialState },
        action
      );
      expect(result).toEqual(output);
    }
  );
});
