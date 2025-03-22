import { JSX } from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid2";

import classes from "./CardList.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { RootState, IArticle } from "../../types/interfaces";
import PreviewCard from "../PreviewCard/PreviewCard";
import { fetchArticles } from "../../utils/fetchAPI";
import { articleActions } from "../../store/articles";
import Error from "../Error";

export default function CardList(): JSX.Element {
  const { articles }: { articles: IArticle[] } = useSelector(
    (store: RootState) => store.articles,
  );
  const currentPage: number | undefined = useSelector(
    (store: RootState) => store.articles.currentPage,
  );
  const loadingError: null | string | undefined = useSelector(
    (store: RootState) => store.articles.loadingError,
  );
  const { turnPage } = articleActions;
  const pageCount: number = Math.ceil(
    useSelector((store: RootState) => store.articles.articlesCount) / 5,
  );
  const dispatch = useDispatch();
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ): void => {
    event.preventDefault();
    dispatch(turnPage(page));
    fetchArticles(dispatch, page);
  };
  if (loadingError) return <Error errorMessage={loadingError} />;
  else {
    return (
      <>
        <Grid rowGap={2} className={classes.grid}>
          {articles.map((a: IArticle) => {
            return <PreviewCard key={a.slug} info={a} />;
          })}
        </Grid>
        <Stack spacing={2} alignItems={"center"} sx={{ marginBottom: 2 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            shape="rounded"
            color="primary"
            onChange={handlePageChange}
          />
        </Stack>
      </>
    );
  }
}
