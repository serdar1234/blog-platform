import Paper from "@mui/material/Paper";
import classes from "./NewArticle.module.scss";
import FormTitle from "../FormTitle";

const Article: React.FC = () => {
  return (
    <Paper className={classes.card} elevation={4}>
      <FormTitle>Create new article</FormTitle>
    </Paper>
  );
};

export default Article;
