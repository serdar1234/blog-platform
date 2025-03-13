import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import classes from "./Article.module.scss";

import Preview from "../Preview";
import { IArticle, RootState } from "../../types/interfaces.ts";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Error from "../Error/Error.tsx";

const Article: React.FC = () => {
  const arts = useSelector((state: RootState) => state.articles.articles);
  const { slug } = useParams();

  const info = arts.find((art: IArticle) => art.slug === slug);
  return (
    <Paper className={classes.card} elevation={4}>
      {info && (
        <Grid container columnSpacing={2} rowSpacing={1}>
          <Preview info={info} type={"article"} />
          <Grid component="article" className={classes.markdown} size={12}>
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {info && info.body}
            </Markdown>
          </Grid>
        </Grid>
      )}
      {info === undefined && <Error />}
    </Paper>
  );
};

export default Article;
