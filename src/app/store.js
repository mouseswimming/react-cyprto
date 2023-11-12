import { configureStore } from "@reduxjs/toolkit";

import { cryptoNewsApi } from "../services/crypotNewsApi";
import { coinGeckoApi } from "../services/coinGeckoApi";

const store = configureStore({
  reducer: {
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoNewsApi.middleware)
      .concat(coinGeckoApi.middleware),
});

export default store;
