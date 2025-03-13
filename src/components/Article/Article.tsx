import Paper from "@mui/material/Paper";
import classes from "./Article.module.scss";
import Grid from "@mui/material/Grid2";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import testText from "../../assets/text.ts";
import { IArticleProps } from "../../types/interfaces.ts";
import PreviewCard from "../PreviewCard/PreviewCard.tsx";

const Article: React.FC<IArticleProps> = ({ info }) => {
  return (
    <Paper className={classes.card} elevation={4}>
      <Grid container columnSpacing={2} rowSpacing={1}>
        <PreviewCard info={info} />
        <Grid component="article" className={classes.markdown} size={12}>
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {testText}
          </Markdown>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Article;
