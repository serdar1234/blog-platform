import { CircularProgress } from "@mui/material";
import classes from "./Spinner.module.scss";

const Spinner: React.FC = () => {
  return <CircularProgress className={classes.spinner} />;
};

export default Spinner;
