import { configureStore } from "@reduxjs/toolkit";
import { textApi } from "./services/text.api.ts";

export const store = configureStore({
  reducer: {
    [textApi.reducerPath]: textApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(textApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
