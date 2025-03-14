import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import classes from "./Header.module.scss";
import { Link } from "react-router";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" className={classes.blogLogo}>
              Realworld Blog
            </Link>
          </Typography>
          <Button type="button">
            <Link to={"/sign-in"}>Sign In</Link>
          </Button>
          <Button
            type="button"
            variant="outlined"
            className={classes.signUp__btn}
          >
            <Link to={"/sign-up"}>Sign Up</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
