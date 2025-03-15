import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import classes from "./Profile.module.scss";
import { useState } from "react";
import { FormControl } from "@mui/material";
import Input from "../Input";

export default function Profile() {
  const [name, setName] = useState("");

  return (
    <Grid className={classes.grid}>
      <Paper elevation={5} className={classes.paper}>
        <h2 className={classes.head}>Edit Profile</h2>
        <FormControl className={classes.form}>
          <Input type="text" text="Username" value={name} cb={setName} />
          <Input type="email" text="Email address" value="" />
          <Input type="password" text="New password" value="" />
          <Input type="text" text="Avatar Image (url)" value="" />
          <Button
            variant="contained"
            size="large"
            disableElevation
            fullWidth
            className={classes.btn}
          >
            Save
          </Button>
        </FormControl>
      </Paper>
    </Grid>
  );
}
