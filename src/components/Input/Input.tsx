import TextField from "@mui/material/TextField";
import { FieldError } from "react-hook-form";
import { InputFieldProps } from "../../types/interfaces";

const InputField: React.FC<InputFieldProps> = ({
  label,
  register,
  name,
  errors,
  rules,
  ...otherProps
}) => {
  console.log(errors, name);
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <TextField
        required
        fullWidth
        id={name}
        size="small"
        margin="dense"
        {...register(name, rules)}
        error={errors && Boolean(errors[name])}
        helperText={
          errors?.[name] ? (
            <span>{(errors[name] as FieldError).message}</span>
          ) : null
        }
        {...otherProps}
      />
    </>
  );
};

export default InputField;
