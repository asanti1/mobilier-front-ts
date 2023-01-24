import {
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { EMAIL_REGEX } from "../../constants/constants";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { containerStyle } from "./registerStyles";
import { countries, RegisterFormValues } from "./types";

const defaultValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  password1: "",
  password2: "",
  phone: "",
  email: "",
  country: "",
  state: "",
  city: "",
  street: "",
  roomNumber: "",
};

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ defaultValues });

  const dispatch = useAppDispatch();

  const onSubmit = (data: RegisterFormValues, event: any) => {
    console.log(data);

    /*     if (data.email === defaultValues.email) return;
    console.log("oops");

    event.preventDefault();
    dispatch(login(data)); */
  };
  return (
    <React.Fragment>
      <Navbar />
      <Container sx={containerStyle} maxWidth="sm">
        <Grid container>
          <Typography variant="h4">Register</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container /* spacing={0} */>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Controller
                  //TODO:
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
                  //TODO:
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
                  //TODO: PASSWORD1 PASSWORD2 SHOULD MATCH
                  name="password1"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="Password"
                      error={!!error}
                      {...field}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Controller
                  //TODO:
                  name="password2"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="Confirm Password"
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
                  //TODO:
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
                  //TODO:
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: EMAIL_REGEX,
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
                    //TODO:
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
                    //TODO:
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
                  //TODO:
                  name="city"
                  control={control}
                  render={({ field }) => <TextField label="City" {...field} />}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Controller
                  //TODO:
                  name="street"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField label="Street" {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Controller
                  //TODO:
                  name="roomNumber"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField label="Room number" {...field} />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container /* spacing={3} */>
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
