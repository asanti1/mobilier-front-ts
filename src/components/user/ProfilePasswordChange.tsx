import EditSharpIcon from "@mui/icons-material/EditSharp";
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
import { containerStyle } from "./styles";
import { DefaultPasswordInformationValues } from "./types";
import { TabPanelProps } from "./UserProfile";

const ProfilePasswordChange = (props: TabPanelProps) => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const { email, _id } = useAppSelector((state) => state.auth.user);
  const { value, index } = props;

  const defaultValues: DefaultPasswordInformationValues = {
    actualPassword: "",
    newPassword1: "",
    newPassword2: "",
  };

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    clearErrors,
    getValues,
    setError,
    resetField,
  } = useForm({ defaultValues });

  const onError = (errors: LoginErrorTypes) => {
    if (errors.invalidCredentials) {
      clearErrors("invalidCredentials");
      onSubmit(getValues());
    }
  };

  const onSubmit = async (data: DefaultPasswordInformationValues) => {
    try {
      await tokenRefreshAPI({
        email: email!,
        password: data.actualPassword!,
      });
      try {
        await modifyUserById(_id!, { password: data.newPassword1 });
      } catch (error) {
        console.log(error);
      }
      setSuccessMessage(() => "Change Applied");
      resetField("actualPassword");
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
            <Typography variant="h6">Password Change</Typography>
            <Grid container>
              <Grid item>
                <Controller
                  name="actualPassword"
                  control={control}
                  rules={{ required: "Password required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      type="password"
                      label="Actual Password"
                      variant="standard"
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <Controller
                  name="newPassword1"
                  control={control}
                  rules={{
                    min: {
                      value: 1,
                      message: "We will need a longer password champ",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                      variant="standard"
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <Controller
                  name="newPassword2"
                  control={control}
                  rules={{
                    required: "Password is required",
                    validate: {
                      required: (value) => {
                        if (watch("newPassword1") != value)
                          return "Passwords dont match";
                      },
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      type="password"
                      label="Repeat New Password"
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button type="submit" endIcon={<EditSharpIcon />}>
              Change Password
            </Button>
            <Typography>{successMessage}</Typography>
          </Container>
        </form>
      )}
    </React.Fragment>
  );
};

export default ProfilePasswordChange;
