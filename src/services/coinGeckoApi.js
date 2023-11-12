import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.coingecko.com/api/v3";

export const coinGeckoApi = createApi({
  reducerPath: "coinGeckoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCoins: builder.query({
      query: (count) =>
        `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${count}&page=1&sparkline=false&price_change_percentage=24h&locale=en`,
    }),
    getGlobal: builder.query({
      query: () => "/global",
    }),
    getCoin: builder.query({
      query: (coinId) =>
        `coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`,
    }),
    getCoinHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        `coins/${coinId}/market_chart?vs_currency=usd&days=${timePeriod}`,
    }),
  }),
});

export const {
  useGetCoinsQuery,
  useGetGlobalQuery,
  useGetCoinQuery,
  useGetCoinHistoryQuery,
} = coinGeckoApi;
