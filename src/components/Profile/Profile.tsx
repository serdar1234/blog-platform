import { useForm } from "react-hook-form";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import InputField from "../Input";

import classes from "./Profile.module.scss";

export default function Profile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  const submitForm = (data: unknown) => console.log(data);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("email", e.target.value.trim().toLowerCase());
  };
  const handleUnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("uname", e.target.value.trim());
  };
  return (
    <Grid className={classes.grid}>
      <Paper elevation={5} className={classes.paper}>
        <h2 className={classes.head}>Edit Profile</h2>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <InputField
            label="Username"
            name="uname"
            defaultValue="Vasya"
            register={register}
            errors={errors}
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Username must be at most 20 characters",
              },
            }}
            onChange={handleUnameChange}
            placeholder="Username"
          />
          <InputField
            label="Email address"
            name="email"
            defaultValue="pupkin@gmail.con"
            register={register}
            errors={errors}
            rules={{
              required: "Email is required.",
              pattern: {
                value: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                message: "Please enter a valid email address",
              },
            }}
            onChange={handleEmailChange}
            placeholder="Email address"
          />
          <InputField
            label="New password"
            name="password"
            register={register}
            errors={errors}
            rules={{
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Your password needs to be at least 6 characters",
              },
              maxLength: {
                value: 40,
                message: "Your password needs to be at most 20 characters",
              },
            }}
            type="password"
            placeholder="New password"
          />
          <InputField
            required={false}
            label="Avatar image (url)"
            name="avatar"
            register={register}
            errors={errors}
            placeholder="Avatar image"
          />
          <Button
            variant="contained"
            size="large"
            type="submit"
            disableElevation
            fullWidth
            className={classes.btn}
          >
            Save
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}
