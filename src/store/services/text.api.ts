import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const textApi = createApi({
  reducerPath: "personApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://baconipsum.com/api/`,
  }),
  endpoints: (build) => ({
    getText: build.query<string[], void>({
      query: () => "?type=all-meat&paras=2&format=json",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetTextQuery } = textApi;
