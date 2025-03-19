import { createSlice } from "@reduxjs/toolkit";
import { IArticlesObject, PayloadAction } from "../types/interfaces";

const initialStateArticles: IArticlesObject = {
  articles: [],
  articlesCount: 0,
  currentPage: 1,
  loadingError: null,
};

const articleSlice = createSlice({
  name: "articles",
  initialState: initialStateArticles,
  reducers: {
    addArticles: (state, action: PayloadAction) => {
      if (action.payload) {
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      }
    },
    turnPage: (state, action: { payload: number }) => {
      state.currentPage = action.payload;
    },
    setError: (state, action: { payload: null | string }) => {
      state.loadingError = action.payload;
    },
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice.reducer;
