import Paper from "@mui/material/Paper";
import classes from "./ArticleCard.module.scss";
import Grid from "@mui/material/Grid2";
import { Avatar, Chip, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ArticleCard() {
  return (
    <Paper className={classes.card} elevation={4}>
      <Grid container columnSpacing={2} rowSpacing={1}>
        <Grid component="div" size={9.6} style={{ height: "50%" }}>
          <Typography
            variant="h6"
            component="h6"
            color="primary"
            className={classes.title}
          >
            Viva la Republica! No pasaran!
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
        <Grid className={classes.avatar} size={2.4}>
          <div>
            <h6>John Doe</h6>
            <time>March 5, 2025</time>
          </div>
          <Avatar src="/1.jpg" alt={`some alt text here`} />
        </Grid>

        <Grid component="div" size={9.6}>
          <Typography className={classes.text} component="span">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
