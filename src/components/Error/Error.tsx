import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import classes from "./Error.module.scss";
import HomeIcon from "@mui/icons-material/Home";

import { useNavigate } from "react-router";

const Error: React.FC<{ errorMessage: string }> = ({ errorMessage }) => {
  const navigate = useNavigate();

  return (
    <>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Something went wrong. {errorMessage}
      </Alert>
      <Button
        className={classes.homeBtn}
        type="button"
        variant="contained"
        color="error"
        endIcon={<HomeIcon />}
        onClick={() => navigate("/")}
      >
        Home
      </Button>
    </>
  );
};

export default Error;
