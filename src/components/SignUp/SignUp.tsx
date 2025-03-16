import { Link } from "react-router";
import { useForm } from "react-hook-form";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Checkbox from "@mui/material/Checkbox";
import InputField from "../Input";

import classes from "./SignUp.module.scss";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({});
  const submitForm = (data: unknown) => console.log(data);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("email", e.target.value.toLowerCase());
  };
  const password = watch("password");
  return (
    <Grid className={classes.grid}>
      <Paper elevation={5} className={classes.paper}>
        <h2 className={classes.head}>Create new account</h2>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <InputField
            label="Username"
            name="name"
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
            placeholder="Username"
          />
          <InputField
            label="Email address"
            name="email"
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
            label="Password"
            name="password"
            register={register}
            errors={errors}
            rules={{
              required: "Password is required",
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
            placeholder="Password"
          />
          <InputField
            label="Repeat Password"
            name="password2"
            register={register}
            errors={errors}
            rules={{
              required: "Password is required",
              validate: (value: string) =>
                value === password || "Passwords must match",
            }}
            type="password"
            placeholder="Repeat Password"
          />
          <div className={classes.agreement}>
            <Checkbox required />
            <span className={classes.text}>
              I agree to the processing of my personal information
            </span>
          </div>
          <Button
            variant="contained"
            size="large"
            type="submit"
            disableElevation
            fullWidth
            className={classes.btn}
          >
            Create
          </Button>
          <span className={classes.helpText}>
            Already have an account? <Link to="/sign-in">Sign In</Link>.
          </span>
        </form>
      </Paper>
    </Grid>
  );
}
