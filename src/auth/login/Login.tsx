import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { hasLoginFailed } from "../../api/mobilierApi";
import Navbar from "../../components/common/Navbar";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { login } from "../../store/auth/thunks";
import { emailPatternValidation } from "../../validations/forms";
import { containerStyle } from "./loginStyles";
import { ErrorTypes, LoginFormValues } from "./types";

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
  } = useForm<LoginFormValues>({
    defaultValues,
  });

  const dispatch = useAppDispatch();

  const onError = (errors: ErrorTypes) => {
    if (errors.invalidCredentials) {
      clearErrors("invalidCredentials");
      onSubmit(getValues());
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    await dispatch(await login(data));

    if (hasLoginFailed) {
      setError("invalidCredentials", {
        type: "custom",
        message: `${hasLoginFailed}`,
      });
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container sx={containerStyle} maxWidth="sm">
        <Grid container>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Grid item>
              <Typography variant="h4" marginTop={2}>
                Login
              </Typography>
              {errors.invalidCredentials && (
                <Typography variant="h6" marginTop={2}>
                  {errors.invalidCredentials.message}
                </Typography>
              )}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  validate: {
                    required: (value) => {
                      return emailPatternValidation(value);
                    },
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    sx={{ mt: 2 }}
                    label="Email"
                    error={!!error}
                    {...field}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            <Grid item>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    sx={{ mt: 2 }}
                    label="Password"
                    error={!!error}
                    type="password"
                    {...field}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Button type="submit" onSubmit={handleSubmit(onSubmit, onError)}>
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid item>
          <Link to="/auth/register">
            <Button>Need an account? register!</Button>
          </Link>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Login;
