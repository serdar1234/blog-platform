import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ErrorIcon from "@mui/icons-material/Error";

import classes from "./Preview.module.scss";
import Markdown from "../Markdown";
import Tags from "../Tags";

import { IArticleProps, RootState } from "../../types/interfaces";
import convertDate from "../../utils/convertDate";
import truncateStr from "../../utils/truncateStr";
import stringAvatar from "../../utils/stringAvatar";
import { deleteArticle } from "../../utils/fetchAPI";
import { Alert } from "@mui/material";
import LikeComponent from "../LikeComponent";

const Preview: React.FC<IArticleProps> = ({ info, type = null }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imgState, setImgState] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const user = useSelector((store: RootState) => store.user);
  const isAuthor: boolean = user.uname === info.author.username;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const page = useSelector((state: RootState) => state.articles.currentPage);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setOpen(false);
    const result: { success: boolean; message: string } | undefined =
      await deleteArticle(dispatch, slug, page);
    if (result && result.success) {
      navigate("/");
    } else if (result && !result.success) {
      setErrorMessage(result.message);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            className={classes.dialogText}
            id="alert-dialog-description"
          >
            <ErrorIcon />
            Are you sure that you want to delete this article?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
        <LikeComponent info={info} type={type} />
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
            onClick={handleClickOpen}
            className={classes.deleteBtn}
          >
            <span>Delete</span>
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
      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      )}
    </>
  );
};

export default Preview;
