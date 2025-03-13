import classes from "./Tags.module.scss";
import { Chip, Stack } from "@mui/material";

type TagsProps = {
  tags: string[];
};

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <Stack className={classes.stackChips} direction="row" spacing={1}>
      {tags.map((tag: string, index: number) => {
        return <Chip key={index} label={tag} size="small" variant="outlined" />;
      })}
    </Stack>
  );
};

export default Tags;
