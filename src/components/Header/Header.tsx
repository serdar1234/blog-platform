import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import classes from "./Header.module.scss";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
            Realworld Blog
          </Typography>
          <Button type="button">Sign In</Button>
          <Button
            type="button"
            variant="outlined"
            className={classes.signUp__btn}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
