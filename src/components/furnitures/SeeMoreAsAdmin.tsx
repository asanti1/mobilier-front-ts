import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import Image from "mui-image";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  addAFurnitureAPI,
  hasLoginFailed,
  tokenRefreshAPI,
} from "../../api/mobilierApi";
import { LoginErrorTypes } from "../../auth/login/types";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { typographyErrorStyle } from "../../material/errorStyle";
import { deleteFurnitureById } from "../../store/furnitures/thunks";
import { DefaultFurnitureProps } from "../interfaces/defaultFurnitureProps";
import { containerStyle } from "../user/styles";
import CartItemHandler from "./CartItemHandler";
import { SeeMoreProps } from "./interfaces/SeeMore";

const SeeMoreAsAdmin = (props: SeeMoreProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { email } = useAppSelector((state) => state.auth.user);

  const defaultValues = {
    name: props.furniture.name,
    cost: props.furniture.cost,
    description: props.furniture.description,
    stock: props.furniture.stock,
    depthZ: props.furniture.depthZ,
    heightX: props.furniture.heightX,
    widthY: props.furniture.widthY,
    wood: props.furniture.wood,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    getValues,
    resetField,
    setError,
  } = useForm<DefaultFurnitureProps>({
    defaultValues,
  });

  const onError = (errors: LoginErrorTypes) => {
    if (errors.invalidCredentials) {
      clearErrors("invalidCredentials");
      onSubmit(getValues());
    }
  };

  const onSubmit = async (data: DefaultFurnitureProps) => {
    try {
      await tokenRefreshAPI({ email: email!, password: data.password });
      try {
        await addAFurnitureAPI({
          name: data.name,
          cost: data.cost,
          description: data.description,
          stock: data.stock,
          depthZ: data.depthZ,
          heightX: data.heightX,
          widthY: data.widthY,
          wood: data.wood,
        });
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

  const handleDelete = async () => {
    try {
      await tokenRefreshAPI({
        email: email!,
        password: getValues("password"),
      });
      try {
        dispatch(deleteFurnitureById(props.furniture._id!));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      setError("invalidCredentials", {
        type: "custom",
        message: `${hasLoginFailed}`,
      });
    }
  };

  return (
    <React.Fragment>
      <Container sx={containerStyle} maxWidth="md">
        <Typography variant="h4" marginTop={2}>
          Furniture Edition / Buy
        </Typography>
        {errors.invalidCredentials && (
          <Typography
            variant="subtitle1"
            sx={typographyErrorStyle}
            marginTop={2}
          >
            {errors.invalidCredentials.message}
          </Typography>
        )}
        <Grid container maxWidth="md">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={3} padding="10px">
                <Image
                  src="../src/assets/placeholder.png"
                  alt="image"
                  width="200px"
                  height="200px"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} padding="10px">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      sx={{ mt: 2 }}
                      label="Furniture Name"
                      error={!!error}
                      {...field}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} padding="10px">
                <Controller
                  name="cost"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="Cost"
                      type="number"
                      onChange={(e) =>
                        onChange(parseFloat(e.target.value) || 1)
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} padding="10px">
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      sx={{ mt: 2 }}
                      multiline
                      label="Description"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4} padding="10px">
                <Controller
                  name="stock"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="Stock"
                      type="number"
                      onChange={(e) => onChange(parseInt(e.target.value) || 1)}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Typography variant="h6" mt={2}>
              Furniture Dimentions
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3} padding="10px">
                <Controller
                  name="depthZ"
                  control={control}
                  rules={{ required: "Depth is required" }}
                  render={({
                    field: { onChange, ...field },
                    fieldState: { error },
                  }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="Depth (cm)"
                      type="number"
                      error={!!error}
                      onChange={(e) =>
                        onChange(parseFloat(e.target.value) || 1)
                      }
                      {...field}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3} padding="10px">
                <Controller
                  name="heightX"
                  control={control}
                  rules={{ required: "Height is required" }}
                  render={({
                    field: { onChange, ...field },
                    fieldState: { error },
                  }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="Height (cm)"
                      error={!!error}
                      type="number"
                      onChange={(e) =>
                        onChange(parseFloat(e.target.value) || 1)
                      }
                      {...field}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3} padding="10px">
                <Controller
                  name="widthY"
                  control={control}
                  rules={{ required: "Width is required" }}
                  render={({
                    field: { onChange, ...field },
                    fieldState: { error },
                  }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="Width (cm)"
                      type="number"
                      error={!!error}
                      onChange={(e) =>
                        onChange(parseFloat(e.target.value) || 1)
                      }
                      {...field}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Typography variant="h6">Wood Type</Typography>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} padding="10px">
                <Controller
                  name="wood"
                  control={control}
                  rules={{ required: "Wood is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      sx={{ mt: 2 }}
                      label="Wood"
                      type="text"
                      error={!!error}
                      {...field}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} padding="10px">
                <CartItemHandler furniture={props.furniture} />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} padding="10px">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="password"
                    label="Your password to apply changes over furniture"
                    variant="standard"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Typography>{successMessage}</Typography>
            <Grid item>
              <Button
                type="submit"
                onSubmit={handleSubmit(onSubmit)}
                disabled={!watch("password")}
              >
                Edit
              </Button>
              <Button
                color="error"
                disabled={!watch("password")}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Grid>
          </form>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default SeeMoreAsAdmin;
