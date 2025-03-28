import { Link, useNavigate } from "react-router";
import { useState, JSX } from "react";
import { useForm, FieldValues } from "react-hook-form";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Checkbox from "@mui/material/Checkbox";
import InputField from "../Input";

import classes from "./SignUp.module.scss";
import { newUserSignUp } from "../../utils/fetchAPI";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import FormTitle from "../FormTitle";

export default function SignUp(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({});

  const submitForm = async (data: FieldValues) => {
    console.log(data);
    const result: { success: boolean; message: string } | undefined =
      await newUserSignUp(dispatch, data);
    if (result && result.success) {
      navigate("/");
    } else if (result && !result.success) {
      setErrorMessage(result.message);
    }
  };

  const handleUnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("uname", e.target.value.trim());
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("email", e.target.value.trim().toLowerCase());
  };
  const password = watch("password");
  return (
    <Grid className={classes.grid}>
      <Paper elevation={5} className={classes.paper}>
        <FormTitle>Create new account</FormTitle>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <InputField
            label="Username"
            name="uname"
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
          {errorMessage && (
            <Alert
              severity="error"
              className={classes.alert}
              onClose={() => setErrorMessage(null)}
            >
              {errorMessage}
            </Alert>
          )}
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
