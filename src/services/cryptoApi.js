import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://coinranking1.p.rapidapi.com";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        `47fc258af2msh3a24669b7130cc4p1ddbdfjsn3f8d6fb9dff0`
      );
      headers.set("X-RapidAPI-Host", `coinranking1.p.rapidapi.com`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => `/coins?limit=${count}`,
    }),
    getCryptoDetail: builder.query({
      query: (coinId) => `/coin/${coinId}`,
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailQuery } = cryptoApi;
