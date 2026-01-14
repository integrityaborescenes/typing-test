import { createSlice } from "@reduxjs/toolkit";

type isStartState = {
  value: boolean;
};

const initialState: isStartState = {
  value: false,
};

export const isStartState = createSlice({
  name: "startState",
  initialState,
  reducers: {
    start: (state) => {
      state.value = true;
    },
    stop: (state) => {
      state.value = false;
    },
  },
});

export const { start, stop } = isStartState.actions;
export default isStartState.reducer;
