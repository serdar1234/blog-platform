import classes from "./PreviewCard.module.scss";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";

import { IArticleProps } from "../../types/interfaces";
import Preview from "../Preview";

const PreviewCard: React.FC<IArticleProps> = ({ info }) => {
  return (
    <>
      <Paper className={classes.card} elevation={4}>
        <Grid container columnSpacing={2} rowSpacing={1}>
          <Preview info={info} />
        </Grid>
      </Paper>
    </>
  );
};

export default PreviewCard;
