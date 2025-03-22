import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import classes from "./Header.module.scss";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { articleActions } from "../../store/articles";
import { logOut } from "../../utils/fetchAPI";
import { fetchArticles } from "../../utils/fetchAPI";
import stringAvatar from "../../utils/stringAvatar";
import { RootState } from "../../types/interfaces";

export default function Header() {
  const [imgState, setImgState] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { turnPage } = articleActions;
  const turnPageOne = () => {
    dispatch(turnPage(1));
    fetchArticles(dispatch, 1);
  };
  const user = useSelector((store: RootState) => store.user);
  const handleLogOut = () => {
    logOut(dispatch);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        className={classes.appBar}
        component={"header"}
      >
        <Toolbar>
          <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" className={classes.blogLogo} onClick={turnPageOne}>
              Realworld Blog
            </Link>
          </Typography>
          {user.isLoggedIn ? (
            <>
              <Button
                type="button"
                size="small"
                variant="outlined"
                className={classes.signUpBtn}
              >
                <Link to={"/new-article"} onClick={() => {}}>
                  Create article
                </Link>
              </Button>
              <NavLink to="/profile" className={classes.profileLogo}>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ marginInlineEnd: 2 }}
                >
                  {user.uname}
                </Typography>
                {!user.avatar && !imgState && (
                  <Avatar {...stringAvatar(user.uname)} alt={user.uname} />
                )}
                <Avatar
                  src={user.avatar}
                  onLoad={() => setImgState(true)}
                  onError={() => setImgState(false)}
                  alt="Your profile image"
                  style={{ display: imgState ? "block" : "none" }}
                />
              </NavLink>
              <Button
                size="large"
                type="button"
                variant="outlined"
                className={classes.logOut}
              >
                <Link to={"/"} onClick={handleLogOut}>
                  Log Out
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button type="button" size="large">
                <NavLink
                  to={"/sign-in"}
                  style={({ isActive }) => ({
                    color: isActive ? "#f5222d" : "#000",
                  })}
                >
                  Sign In
                </NavLink>
              </Button>
              <Button
                type="button"
                variant="outlined"
                size="large"
                className={classes.signUpBtn}
              >
                <Link to={"/sign-up"}>Sign Up</Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
