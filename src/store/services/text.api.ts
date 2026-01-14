import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const textApi = createApi({
  reducerPath: "personApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://metaphorpsum.com/`,
    responseHandler: (response) => response.text(),
  }),
  endpoints: (build) => ({
    getText: build.query<string, void>({
      query: () => "sentences/30",
      keepUnusedDataFor: 600,
    }),
  }),
});
export const { useGetTextQuery } = textApi;
