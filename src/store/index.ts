import { configureStore } from "@reduxjs/toolkit";
import articles from "./articles";

const store = configureStore({
  reducer: {
    articles: articles,
    // two: twoSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
