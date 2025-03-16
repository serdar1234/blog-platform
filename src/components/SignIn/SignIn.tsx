import { Link } from "react-router";
import { useForm } from "react-hook-form";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import InputField from "../Input";

import classes from "./SignIn.module.scss";

export default function SignIn() {
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
  return (
    <Grid className={classes.grid}>
      <Paper elevation={5} className={classes.paper}>
        <h2 className={classes.head}>Sign In</h2>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
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
          <Button
            variant="contained"
            size="large"
            type="submit"
            disableElevation
            fullWidth
            className={classes.btn}
          >
            Login
          </Button>
          <span className={classes.helpText}>
            Don&#39;t have an account? <Link to="/sign-up">Sign Up</Link>.
          </span>
        </form>
      </Paper>
    </Grid>
  );
}
