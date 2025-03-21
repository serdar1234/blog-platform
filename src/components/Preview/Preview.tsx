import classes from "./Preview.module.scss";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import Markdown from "../Markdown";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IArticleProps, RootState } from "../../types/interfaces";
import convertDate from "../../utils/convertDate";
import truncateStr from "../../utils/truncateStr";

import { useState } from "react";
import stringAvatar from "../../utils/stringAvatar";
import { Link } from "react-router";
import Tags from "../Tags";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const Preview: React.FC<IArticleProps> = ({ info, type = null }) => {
  const [imgState, setImgState] = useState<boolean>(false);
  const user = useSelector((store: RootState) => store.user);
  const isAuthor: boolean = user.uname === info.author.username;
  return (
    <>
      <Grid component="div" size={9.6} style={{ height: "50%" }}>
        <Typography
          variant="h6"
          component="h6"
          color="primary"
          className={classes.title}
        >
          {type ? (
            info.title
          ) : (
            <Link to={`/articles/${info.slug}`}>{truncateStr(info.title)}</Link>
          )}
        </Typography>
        <span className={classes.likeSpan}>
          <FavoriteBorderIcon fontSize="small" className={classes.heart} />
          {info.favoritesCount}
        </span>
        <Tags tags={type ? info.tagList : info.tagList.slice(0, 7)} />
      </Grid>
      <Grid className={classes.avatar} size={2.4}>
        <div>
          <h6>{info.author.username}</h6>
          <time>{convertDate(info.createdAt)}</time>
        </div>
        {!imgState && (
          <Avatar
            {...stringAvatar(info.author.username)}
            alt={info.author.bio}
          />
        )}
        <Avatar
          src={info.author.image}
          onLoad={() => setImgState(true)}
          onError={() => setImgState(false)}
          alt={info.author.bio}
          style={{ display: imgState ? "block" : "none" }}
        />
      </Grid>
      <Grid component="div" size={9.6}>
        <Typography className={classes.text} component="span">
          <Markdown>
            {type ? info.description : truncateStr(info.description, 175)}
          </Markdown>
        </Typography>
      </Grid>
      {type && user.isLoggedIn && isAuthor && (
        <Grid className={classes.articleBtns} size={2.4}>
          <Button
            type="button"
            size="small"
            color="error"
            variant="outlined"
            className={classes.deleteBtn}
          >
            <Link to={"/"} onClick={() => {}}>
              Delete
            </Link>
          </Button>
          <Button
            type="button"
            size="small"
            color="success"
            variant="outlined"
            className={classes.editBtn}
          >
            <Link to={`/articles/${info.slug}/edit`} onClick={() => {}}>
              Edit
            </Link>
          </Button>
        </Grid>
      )}
    </>
  );
};

export default Preview;
