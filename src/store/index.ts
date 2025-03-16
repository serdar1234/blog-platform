import { configureStore } from "@reduxjs/toolkit";
import articles from "./articles";

const store = configureStore({
  reducer: {
    articles: articles,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
