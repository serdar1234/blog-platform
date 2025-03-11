import Paper from "@mui/material/Paper";
import classes from "./ArticleCard.module.scss";
import Grid from "@mui/material/Grid2";
import { Chip, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { pink } from "@mui/material/colors";

export default function ArticleCard() {
  return (
    <Paper className={classes.card} elevation={4}>
      <Grid container spacing={2}>
        <Grid component="div" size={8} style={{ backgroundColor: "pink" }}>
          <Typography
            variant="h6"
            component="h6"
            color="primary"
            className={classes.title}
          >
            Una patria, un estado, un caudillo!
          </Typography>
          <span style={{ color: "#000000BF" }}>
            <FavoriteBorderIcon fontSize="small" className={classes.heart} />
            12
          </span>
          <Stack className={classes.stackChips} direction="row" spacing={1}>
            <Chip label="Tag1" size="small" variant="outlined" />
            <Chip label="SomeTag" size="small" variant="outlined" />
          </Stack>
        </Grid>
        <Grid component="div" size={4} style={{ backgroundColor: "salmon" }}>
          <p>Una, Grande y Libre!</p>
        </Grid>
      </Grid>
    </Paper>
  );
}
