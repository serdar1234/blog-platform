import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid2";

import classes from "./CardList.module.scss";

import { useSelector } from "react-redux";
import { RootState, IArticle } from "../../types/interfaces";
import PreviewCard from "../Card/PreviewCard";

export default function CardList() {
  const articles: IArticle[] = useSelector(
    (store: RootState) => store.articles.articles,
  );
  const pageCount: number = useSelector(
    (store: RootState) => store.articles.articlesCount,
  );

  return (
    <>
      <Grid rowGap={2} className={classes.grid}>
        {articles.map((a: IArticle) => {
          return <PreviewCard key={a.slug} info={a} />;
        })}
      </Grid>
      <Stack spacing={2} alignItems={"center"} sx={{ marginBottom: 2 }}>
        <Pagination
          count={Math.ceil(pageCount / 5)}
          shape="rounded"
          color="primary"
        />
      </Stack>
    </>
  );
}
