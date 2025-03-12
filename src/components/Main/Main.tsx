import { Container } from "@mui/material";
import Header from "../Header";
import { Outlet } from "react-router";

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <Container style={{ maxWidth: 938 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Main;
