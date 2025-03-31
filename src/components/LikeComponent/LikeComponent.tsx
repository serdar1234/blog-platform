import { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import classes from "./LikeComponent.module.scss";

import { IArticleProps, RootState } from "../../types/interfaces";

import { dislikeArticle, favorArticle } from "../../utils/fetchAPI";
import { Alert } from "@mui/material";

const LikeComponent: React.FC<IArticleProps> = ({ info, type = null }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const page = useSelector((state: RootState) => state.articles.currentPage);
  const IconComponent = info.favorited
    ? FavoriteOutlinedIcon
    : FavoriteBorderOutlinedIcon;

  const handleLikeClick = async () => {
    if (type) {
      const result: { success: boolean; message: string } | undefined =
        info.favorited
          ? await dislikeArticle(dispatch, slug, page)
          : await favorArticle(dispatch, slug, page);
      if (result && !result.success) {
        setErrorMessage(result.message);
      }
    }
  };
  console.log("like component rerender");
  if (errorMessage) {
    return (
      <Alert severity="error" onClose={() => setErrorMessage(null)}>
        {errorMessage}
      </Alert>
    );
  } else
    return (
      <span className={classes.likeSpan}>
        <IconComponent
          fontSize="small"
          className={classNames(classes.heart, {
            [classes.favored]: info.favorited,
          })}
          onClick={handleLikeClick}
        />
        {info.favoritesCount}
      </span>
    );
};

export default LikeComponent;
