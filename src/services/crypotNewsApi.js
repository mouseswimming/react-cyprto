import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://biztoc.p.rapidapi.com";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_RAPIDAPI_KEY);
      headers.set("X-RapidAPI-Host", import.meta.env.VITE_RAPIDAPI_HOST);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => `/search?q=${newsCategory}`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
