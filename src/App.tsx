import Grid from "@mui/material/Grid2";
import classes from "./App.module.scss";
import ArticleCard from "./components/Card";
import Header from "./components/Header";
import { Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function App() {
  return (
    <>
      <Header />
      <Container style={{ maxWidth: 938 }}>
        <Grid rowGap={2} className={classes.grid}>
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </Grid>
        <Stack spacing={2} alignItems={"center"} sx={{ marginBottom: 2 }}>
          <Pagination count={10} shape="rounded" color="primary" />
        </Stack>
      </Container>
    </>
  );
}

export default App;
