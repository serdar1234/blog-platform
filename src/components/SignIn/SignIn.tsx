import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router";
import classes from "./SignIn.module.scss";
import { FormControl, TextField } from "@mui/material";
import { useState } from "react";

export default function SignIn() {
  const [name, setName] = useState("");

  return (
    <Grid className={classes.grid}>
      <Paper elevation={5} className={classes.paper}>
        <h2 className={classes.head}>Sign In</h2>
        <FormControl className={classes.form}>
          <label htmlFor="email">Email address</label>
          <TextField
            fullWidth
            id="email"
            name="email"
            size="small"
            type="email"
            placeholder="Email address"
            variant="outlined"
            margin="dense"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <TextField
            fullWidth
            name="password"
            id="password"
            size="small"
            type="password"
            placeholder="Password"
            margin="dense"
            variant="outlined"
          />
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
