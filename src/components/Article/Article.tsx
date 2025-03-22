import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./Article.module.scss";

import { IArticle, RootState } from "../../types/interfaces.ts";
import Markdown from "../Markdown";
import Preview from "../Preview";
import Error from "../Error";
import truncateStr from "../../utils/truncateStr.ts";
import { fetchThisArticle } from "../../utils/fetchAPI.ts";

const Article: React.FC = () => {
  const arts = useSelector((state: RootState) => state.articles.articles);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [info, setInfo] = useState<IArticle | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const articleInStore = arts.find((art: IArticle) => art.slug === slug);
    if (articleInStore) {
      setInfo(articleInStore);
      setIsLoading(false);
    } else {
      fetchThisArticle(slug, dispatch)
        .then((res) => {
          if (res) {
            const thisArticle = res.article;
            setInfo(thisArticle);
            setIsLoading(false);
          } else {
            setInfo(null);
          }
        })
        .catch((error) => {
          setInfo(null);
          return <Error errorMessage={error.message} />;
        });
    }
  }, [slug, arts, dispatch]);

  if (isLoading) return <CircularProgress />;
  return (
    <Paper component="section" className={classes.card} elevation={4}>
      {info && (
        <Grid container columnSpacing={2} rowSpacing={1}>
          <meta name="author" content={info.author.username} />
          <title>{truncateStr(info.title, 60)}</title>
          <Preview info={info} type={"article"} />
          <Grid component="article" className={classes.markdown} size={12}>
            <Markdown>{info && info.body}</Markdown>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default Article;
