import Grid from "@mui/material/Grid2";
import classes from "./App.module.scss";
import ArticleCard from "./components/Card";
import Header from "./components/Header";
import { Container } from "@mui/material";

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
      </Container>
    </>
  );
}

export default App;
