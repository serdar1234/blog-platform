import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Markdown from "../Markdown";
import classes from "./Article.module.scss";

import Preview from "../Preview";
import { IArticle, RootState } from "../../types/interfaces.ts";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Error from "../Error/Error.tsx";
import truncateStr from "../../utils/truncateStr.ts";
import { fetchThisArticle } from "../../utils/fetchAPI.ts";
import { CircularProgress } from "@mui/material";

const Article: React.FC = () => {
  const arts = useSelector((state: RootState) => state.articles.articles);
  const { slug } = useParams();
  const [info, setInfo] = useState<IArticle | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const articleInStore = arts.find((art: IArticle) => art.slug === slug);
    if (articleInStore) {
      setInfo(articleInStore);
      setIsLoading(false);
    } else {
      fetchThisArticle(slug)
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
  }, [slug, arts]);
  if (isLoading) return <CircularProgress />;
  return (
    <Paper className={classes.card} elevation={4}>
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
