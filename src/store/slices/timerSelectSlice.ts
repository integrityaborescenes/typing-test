import { createSlice } from "@reduxjs/toolkit";

type timerState = {
  value: number;
};

const initialState: timerState = {
  value: 30,
};

export const timerStateSlice = createSlice({
  name: "timerState",
  initialState,
  reducers: {
    half: (state) => {
      state.value = 30;
    },
    full: (state) => {
      state.value = 60;
    },
  },
});

export const { half, full } = timerStateSlice.actions;
export default timerStateSlice.reducer;
