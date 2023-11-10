import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://biztoc.p.rapidapi.com";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "47fc258af2msh3a24669b7130cc4p1ddbdfjsn3f8d6fb9dff0"
      );
      headers.set("X-RapidAPI-Host", "biztoc.p.rapidapi.com");

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
