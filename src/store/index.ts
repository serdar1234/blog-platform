import { configureStore } from "@reduxjs/toolkit";
import articles from "./articles";
import user from "./user";

const store = configureStore({
  reducer: {
    articles: articles,
    user: user,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
