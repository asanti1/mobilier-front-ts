import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/system/Container";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  hasLoginFailed,
  modifyUserById,
  tokenRefreshAPI,
} from "../../api/mobilierApi";
import { LoginErrorTypes } from "../../auth/login/types";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { typographyErrorStyle } from "../../material/errorStyle";
import { updateUserInformation } from "../../store/auth/authSlice";
import { emailPatternValidation } from "../../validations/forms";
import { containerStyle } from "./styles";
import { DefaultMainInformationValues } from "./types";
import { TabPanelProps } from "./UserProfile";

const ProfileMainInformation = (props: TabPanelProps) => {
  const { value, index } = props;
  const { firstName, lastName, email, phone, _id } = useAppSelector(
    (state) => state.auth.user
  );

  const dispatch = useAppDispatch();

  const [successMessage, setSuccessMessage] = useState<string>("");

  const defaultValues: DefaultMainInformationValues = {
    email: email || "",
    phone: phone || "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    getValues,
    clearErrors,
    resetField,
  } = useForm({ defaultValues });

  const onError = (errors: LoginErrorTypes) => {
    if (errors.invalidCredentials) {
      clearErrors("invalidCredentials");
      onSubmit(getValues());
    }
  };

  const onSubmit = async (data: DefaultMainInformationValues) => {
    try {
      await tokenRefreshAPI({
        email: email!,
        password: data.password,
      });
      try {
        await modifyUserById(_id!, { email: data.email, phone: data.phone });
        dispatch(
          updateUserInformation({ email: data.email, phone: data.phone })
        );
      } catch (error) {
        console.log(error);
      }
      setSuccessMessage(() => "Change Applied");
      resetField("password");
      setTimeout(() => {
        setSuccessMessage(() => "");
      }, 2000);
    } catch (error) {
      setError("invalidCredentials", {
        type: "custom",
        message: `${hasLoginFailed}`,
      });
    }
  };

  return (
    <React.Fragment>
      {value === index && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Grid container>
            <Container sx={containerStyle} maxWidth="xs">
              {errors.invalidCredentials && (
                <Typography
                  variant="subtitle1"
                  sx={typographyErrorStyle}
                  marginTop={2}
                >
                  {errors.invalidCredentials.message}
                </Typography>
              )}
              <Typography variant="h6">Your Profile</Typography>
              <Grid container flex="row">
                <Grid item xs={12} mt={1}>
                  <TextField
                    label="Full Name"
                    variant="standard"
                    value={`${firstName} ${lastName}`}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} mt={3}>
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
                        label="Email"
                        variant="standard"
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} mt={3}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField label="Phone" {...field} variant="standard" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} mt={3}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        type="password"
                        label="Your password to apply changes"
                        variant="standard"
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button type="submit" disabled={!watch("password")}>
                Edit
              </Button>
              <Typography>{successMessage}</Typography>
            </Container>
          </Grid>
        </form>
      )}
    </React.Fragment>
  );
};

export default ProfileMainInformation;
