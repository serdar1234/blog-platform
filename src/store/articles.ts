import { createSlice } from "@reduxjs/toolkit";
import { IArticlesObject, PayloadAction } from "../types/interfaces";

const initialStateArticles: IArticlesObject = {
  articles: [],
  articlesCount: 0,
};

const articleSlice = createSlice({
  name: "articles",
  initialState: initialStateArticles,
  reducers: {
    addArticles: (state, action: PayloadAction) => {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice.reducer;
