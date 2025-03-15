import classes from "./SignUp.module.scss";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router";
import { FormControl, TextField, Checkbox } from "@mui/material";
import { useState } from "react";
import Input from "../Input";

export default function SignUp() {
  const [name, setName] = useState("");

  return (
    <Grid className={classes.grid}>
      <Paper elevation={5} className={classes.paper}>
        <h2 className={classes.head}>Create new account</h2>
        <FormControl className={classes.form}>
          <Input type="text" text="Username" value={name} cb={setName} />
          <Input type="email" text="Email address" value="" />
          <Input type="password" text="Password" value="" />
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
