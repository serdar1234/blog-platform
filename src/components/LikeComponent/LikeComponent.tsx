import { useState } from "react";
import { useParams } from "react-router";
import classNames from "classnames";

import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import classes from "./LikeComponent.module.scss";

import { IArticleProps, IResult } from "../../types/interfaces";

import { dislikeArticle, favorArticle } from "../../utils/fetchAPI";
import { Alert } from "@mui/material";

const LikeComponent: React.FC<IArticleProps> = ({ info, type = null }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<IResult | undefined>(undefined);
  const [isLiked, setIsLiked] = useState<boolean>(info.favorited);
  const { slug } = useParams();

  const handleLikeClick = async () => {
    if (type) {
      if (isLiked) {
        const res = await dislikeArticle(slug);
        setIsLiked(false);
        setResult(res);
      } else {
        const res = await favorArticle(slug);
        setIsLiked(true);
        setResult(res);
      }
      if (result && !result.success) {
        setErrorMessage(result.message);
      }
    }
  };

  const IconComponent = isLiked
    ? FavoriteOutlinedIcon
    : FavoriteBorderOutlinedIcon;

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
            [classes.favored]:
              result && result.success ? result.favorited : info.favorited,
          })}
          onClick={handleLikeClick}
        />
        {result && result.success ? result.favoritesCount : info.favoritesCount}
      </span>
    );
};

export default LikeComponent;
