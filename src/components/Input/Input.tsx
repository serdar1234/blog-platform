import TextField from "@mui/material/TextField";

import {
  FieldError,
  FieldErrors,
  UseFormRegister,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface InputFieldProps {
  label: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder: string;
  errors?: FieldErrors<FieldValues>;
  rules?: RegisterOptions<FieldValues>;
  // rules?: {
  //   required?: string | boolean;
  //   pattern?: { value: RegExp; message: string };
  //   minLength?: { value: number; message: string };
  //   maxLength?: { value: number; message: string };
  //   validate?: (x: string) => void;
  // };
  [key: string]: unknown;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  register,
  name,
  errors,
  rules,
  ...otherProps
}) => {
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
