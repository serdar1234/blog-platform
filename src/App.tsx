// import Grid from "@mui/material/Grid2";
// import classes from "./App.module.scss";
// import Article from "./components/Article";
// import ArticleCard from "./components/Card";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import Header from "./components/Header";
// import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchArticles } from "./utils/fetchAPI";
import RootLayout from "./pages/RootPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchArticles(dispatch);
  }, [dispatch]);

  return <RootLayout />;
  {
    /* <Grid rowGap={2} className={classes.grid}>
          <Article /> */
  }
  {
    /* <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard /> */
  }
  {
    /* </Grid>
        <Stack spacing={2} alignItems={"center"} sx={{ marginBottom: 2 }}>
          <Pagination count={10} shape="rounded" color="primary" />
        </Stack> */
  }
}

export default App;
