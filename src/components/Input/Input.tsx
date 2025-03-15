import TextField from "@mui/material/TextField";
import truncateStr from "../../utils/truncateStr";

export default function SignIn({
  type,
  text,
  value,
  cb,
}: {
  type: string;
  text: string;
  value: string;
  cb?: (event: string) => void;
}) {
  return (
    <>
      <label htmlFor={type}>{text}</label>
      <TextField
        fullWidth
        id={type}
        name={type}
        size="small"
        type={type}
        placeholder={truncateStr(text, 13)}
        variant="outlined"
        margin="dense"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (cb) cb(event.target.value);
        }}
      />
    </>
  );
}
