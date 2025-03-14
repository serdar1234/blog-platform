import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router";
import classes from "./SignIn.module.scss";
import FormControl from "@mui/material/FormControl";
import Input from "../Input";

export default function SignIn() {
  return (
    <Grid className={classes.grid}>
      <Paper elevation={5} className={classes.paper}>
        <h2 className={classes.head}>Sign In</h2>
        <FormControl className={classes.form}>
          <Input type="email" text="Email address" value="" />
          <Input type="password" text="Password" value="" />
          <Button
            variant="contained"
            size="large"
            disableElevation
            fullWidth
            className={classes.btn}
          >
            Login
          </Button>
          <span className={classes.helpText}>
            Don&#39;t have an account? <Link to="/sign-up">Sign Up</Link>.
          </span>
        </FormControl>
      </Paper>
    </Grid>
  );
}
