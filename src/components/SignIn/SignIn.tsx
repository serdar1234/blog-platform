import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import InputField from "../Input";

import classes from "./SignIn.module.scss";
import { userSignIn } from "../../utils/fetchAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types/interfaces";
import { Alert } from "@mui/material";
import FormTitle from "../FormTitle";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.user.email);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const submitForm = async (data: FieldValues) => {
    const result: { success: boolean; message: string } | undefined =
      await userSignIn(dispatch, data);
    if (result && result.success) {
      navigate("/");
    } else if (result && !result.success) {
      setErrorMessage(result.message);
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("email", e.target.value.trim().toLowerCase());
  };

  return (
    <Grid className={classes.grid}>
      <Paper elevation={5} className={classes.paper}>
        <FormTitle>Sign in</FormTitle>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <InputField
            label="Email address"
            name="email"
            register={register}
            defaultValue={email}
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
          {errorMessage && (
            <Alert
              severity="error"
              className={classes.alert}
              onClose={() => setErrorMessage(null)}
            >
              {errorMessage}
            </Alert>
          )}
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
