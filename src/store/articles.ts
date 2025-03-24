import { createSlice } from "@reduxjs/toolkit";
import { IArticlesObject, PayloadAction } from "../types/interfaces";

const initialStateArticles: IArticlesObject = {
  articles: [],
  articlesCount: 0,
  currentPage: 1,
  loadingError: null,
  isLoading: true,
};

const articleSlice = createSlice({
  name: "articles",
  initialState: initialStateArticles,
  reducers: {
    addArticles: (state, action: PayloadAction) => {
      if (action.payload) {
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.isLoading = false;
      }
    },
    turnPage: (state, action: { payload: number }) => {
      state.currentPage = action.payload;
    },
    setError: (state, action: { payload: null | string }) => {
      state.loadingError = action.payload;
      state.isLoading = false;
    },
    setIsLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice.reducer;
