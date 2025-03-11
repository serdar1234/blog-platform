import { Container } from "@mui/material";
import "./App.scss";
import ArticleCard from "./components/Card";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Container style={{ maxWidth: 938, paddingTop: 26 }}>
        <ArticleCard />
      </Container>
    </>
  );
}

export default App;
