import Paper from "@mui/material/Paper";
import classes from "./Article.module.scss";
import Grid from "@mui/material/Grid2";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import Preview from "../Preview";
import { IArticle, RootState } from "../../types/interfaces.ts";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const Article: React.FC = () => {
  const arts = useSelector((state: RootState) => state.articles.articles);
  console.log(arts);
  const { slug } = useParams();
  const info = arts.filter((art: IArticle) => art.slug === slug);
  return (
    <Paper className={classes.card} elevation={4}>
      <Grid container columnSpacing={2} rowSpacing={1}>
        <Preview info={info[0]} />
        <Grid component="article" className={classes.markdown} size={12}>
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {info[0].body}
          </Markdown>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Article;
