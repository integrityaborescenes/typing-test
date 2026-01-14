import { createSlice } from "@reduxjs/toolkit";

type isEndSlice = {
  value: boolean;
};

const initialState: isEndSlice = {
  value: false,
};

export const isEndSlice = createSlice({
  name: "endState",
  initialState,
  reducers: {
    end: (state) => {
      state.value = true;
    },
    notend: (state) => {
      state.value = false;
    },
  },
});

export const { end, notend } = isEndSlice.actions;
export default isEndSlice.reducer;
