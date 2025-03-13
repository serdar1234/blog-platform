import classes from "./Preview.module.scss";
import Grid from "@mui/material/Grid2";
import { Avatar, Chip, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IArticleProps } from "../../types/interfaces";
import convertDate from "../../utils/convertDate";
import truncateStr from "../../utils/truncateStr";

import { useState } from "react";
import stringAvatar from "../../utils/stringAvatar";
import { Link } from "react-router";

const Preview: React.FC<IArticleProps> = ({ info }) => {
  const [imgState, setImgState] = useState<boolean>(false);

  return (
    <>
      <Grid component="div" size={9.6} style={{ height: "50%" }}>
        <Typography
          variant="h6"
          component="h6"
          color="primary"
          className={classes.title}
        >
          <Link to={`/articles/${info.slug}`}>
            {truncateStr(info.title, 60)}
          </Link>
        </Typography>
        <span style={{ color: "#000000BF" }}>
          <FavoriteBorderIcon fontSize="small" className={classes.heart} />
          {info.favoritesCount}
        </span>
        <Stack className={classes.stackChips} direction="row" spacing={1}>
          <Chip label="Tag1" size="small" variant="outlined" />
          <Chip label="SomeTag" size="small" variant="outlined" />
        </Stack>
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
          {info.description}
        </Typography>
      </Grid>
    </>
  );
};

export default Preview;
