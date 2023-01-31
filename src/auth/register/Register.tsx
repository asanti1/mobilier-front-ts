import {
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { register } from "../../store/auth/thunks";
import {
  emailPatternValidation
} from "../../validations/forms";
import { containerStyle } from "./registerStyles";
import { countries, defaultValues, RegisterFormValues } from "./types";

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<RegisterFormValues>({ defaultValues });

  const dispatch = useAppDispatch();
  const onSubmit = async (data: RegisterFormValues, event: any) => {
    await dispatch(
      await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password1,
        phone: data.phone,
        address: [
          {
            country: data.country,
            state: data.state,
            city: data.city,
            street: data.street,
            roomNumber: data.roomNumber,
          },
        ],
      })
    );
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container sx={containerStyle} maxWidth="sm">
        <Grid container>
          <Typography variant="h4">Register</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "First name is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="First Name"
                      error={!!error}
                      {...field}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "Last name is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="Last Name"
                      error={!!error}
                      {...field}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Controller
                  name="password1"
                  control={control}
                  rules={{
                    required: "Password is required",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="Password"
                      type="password"
                      error={!!error}
                      {...field}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Controller
                  name="password2"
                  control={control}
                  rules={{
                    required: "Password is required",
                    validate: {
                      required: (value) => {
                        if (watch("password1") != value)
                          return "Passwords dont match";
                      },
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="Confirm Password"
                      type="password"
                      error={!!error}
                      {...field}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container marginBottom={4}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="Phone (optional)"
                      error={!!error}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
            </Grid>
            <Divider
              style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
            />
            <Typography variant="h5">Billing information </Typography>
            <Typography variant="caption">
              (optional but you will need to fill it for a purchase)
            </Typography>
            <Grid container marginTop={2}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field: { value, ...field } }) => (
                      <TextField
                        select
                        label="Country"
                        defaultValue=""
                        sx={{ width: "95%" }}
                        {...field}
                      >
                        {countries.map((country) => (
                          <MenuItem key={country} value={country} {...field}>
                            {country}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField label="State" {...field} />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} marginTop={1}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => <TextField label="City" {...field} />}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Controller
                  name="street"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField label="Street" {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Controller
                  name="roomNumber"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField label="Room number" {...field} />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Button type="submit">Register</Button>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Link to="/auth/login">
                  <Button>Already Have Account? Login!</Button>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Register;
