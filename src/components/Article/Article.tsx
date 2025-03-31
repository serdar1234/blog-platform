import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import classes from "./Article.module.scss";

import { IArticle, RootState } from "../../types/interfaces.ts";
import Markdown from "../Markdown";
import Preview from "../Preview";
import Error from "../Error";
import truncateStr from "../../utils/truncateStr.ts";
import { fetchThisArticle } from "../../utils/fetchAPI.ts";
import { articleActions } from "../../store/articles.ts";
import Spinner from "../Spinner/Spinner.tsx";

const Article: React.FC = () => {
  const {
    articles,
    loadingError,
    isLoading,
  }: {
    articles: IArticle[];
    loadingError?: string | null;
    isLoading: boolean;
  } = useSelector((store: RootState) => ({
    articles: store.articles.articles,
    loadingError: store.articles.loadingError,
    isLoading: store.articles.isLoading,
  }));
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [info, setInfo] = useState<IArticle | undefined | null>(null);

  useEffect(() => {
    const articleInStore = articles.find((art: IArticle) => art.slug === slug);
    if (articleInStore) {
      setInfo(articleInStore);
    } else {
      dispatch(articleActions.setIsLoading());
      fetchThisArticle(slug, dispatch)
        .then((res) => {
          if (res) {
            const thisArticle = res.article;
            setInfo(thisArticle);
          } else {
            setInfo(null);
          }
        })
        .catch((error) => {
          setInfo(null);
          return <Error errorMessage={error.message} />;
        });
    }
  }, [slug, articles, dispatch]);

  console.log("article rerender");
  if (isLoading) return <Spinner />;
  else if (loadingError) return <Error errorMessage={loadingError} />;
  else {
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
  }
};

export default Article;
