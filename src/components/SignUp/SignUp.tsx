import classes from "./SignUp.module.scss";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router";
import { FormControl, TextField, Checkbox } from "@mui/material";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");

  return (
    <Grid className={classes.grid}>
      <Paper elevation={5} className={classes.paper}>
        <h2 className={classes.head}>Create new account</h2>
        <FormControl className={classes.form}>
          <label htmlFor="username">Username</label>
          <TextField
            fullWidth
            id="username"
            name="username"
            size="small"
            type="text"
            placeholder="Username"
            margin="dense"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
          />
          <label htmlFor="email">Email address</label>
          <TextField
            fullWidth
            id="email"
            name="email"
            size="small"
            type="email"
            placeholder="Email address"
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
          />
          <label htmlFor="password">Repeat Password</label>
          <TextField
            fullWidth
            name="password2"
            id="password2"
            size="small"
            type="password"
            placeholder="Password"
            margin="dense"
          />
          <div className={classes.agreement}>
            <Checkbox />
            <span className={classes.text}>
              I agree to the processing of my personal information
            </span>
          </div>
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
            Already have an account? <Link to="/sign-in">Sign In</Link>.
          </span>
        </FormControl>
      </Paper>
    </Grid>
  );
}
