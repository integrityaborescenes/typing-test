import { configureStore } from "@reduxjs/toolkit";
import { textApi } from "./services/text.api.ts";
import timerSelectSlice from "./slices/timerSelectSlice.ts";
import isUserStartsTypingSlice from "./slices/isUserStartsTypingSlice.ts";

export const store = configureStore({
  reducer: {
    [textApi.reducerPath]: textApi.reducer,
    timerSelectSlice: timerSelectSlice,
    isUserStarts: isUserStartsTypingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(textApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
