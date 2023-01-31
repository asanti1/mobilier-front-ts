import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getValue } from "@mui/system";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  addAnAddressAPI,
  deleteAnAddressById,
  hasLoginFailed,
  modifyAddressById,
  tokenRefreshAPI,
} from "../../api/mobilierApi";
import { LoginErrorTypes } from "../../auth/login/types";
import { countries } from "../../auth/register/types";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { Address } from "../../interfaces/address";
import { typographyErrorStyle } from "../../material/errorStyle";
import {
  addAnAddress,
  deleteAnAddress,
  updateAnAddress,
} from "../../store/auth/authSlice";
import { containerStyle } from "./styles";
import { DefaultAddressInformationValues, FormType } from "./types";

type AddressProps = {
  address?: Address;
  id?: number;
  title: string;
  type: FormType;
};

const AddressItem = (props: AddressProps) => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const dispatch = useAppDispatch();

  const { email, _id } = useAppSelector((state) => state.auth.user);

  const { country, state, city, street, roomNumber, addressId } =
    props.address!;

  const defaultValues: DefaultAddressInformationValues = {
    country: country || "",
    state: state || "",
    city: city || "",
    street: street || "",
    roomNumber: roomNumber || "",
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

  const editAnAddress = async (data: DefaultAddressInformationValues) => {
    try {
      await modifyAddressById(_id!, {
        addressId: addressId,
        country: data.country,
        state: data.state,
        city: data.city,
        street: data.street!,
        roomNumber: data.roomNumber,
      });
      dispatch(
        updateAnAddress({
          index: props.id!,
          address: {
            addressId: addressId,
            country: data.country,
            state: data.state,
            city: data.city,
            street: data.street!,
            roomNumber: data.roomNumber,
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addNewAddress = async (data: DefaultAddressInformationValues) => {
    try {
      const address = await addAnAddressAPI(_id!, {
        country: data.country,
        state: data.state,
        city: data.city,
        street: data.street!,
        roomNumber: data.roomNumber,
      });
      const lastAddress = address[address.length - 1];
      dispatch(addAnAddress(lastAddress));
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: DefaultAddressInformationValues) => {
    try {
      await tokenRefreshAPI({
        email: email!,
        password: data.password,
      });
      if (props.type === FormType.NORMAL) {
        await editAnAddress(data);
      } else {
        await addNewAddress(data);
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
        await deleteAnAddressById(_id!, addressId!);
        dispatch(deleteAnAddress(props.id!));
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
      <Grid
        sx={containerStyle}
        ml="10px"
        minWidth="24vw"
        item
        xs={2}
        sm={2}
        md={4}
        lg={2}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Grid container sx={{ marginLeft: "10px" }}>
            <Typography variant="h6">{props.title}</Typography>
            {errors.invalidCredentials && (
              <Typography
                variant="subtitle1"
                sx={typographyErrorStyle}
                marginTop={2}
              >
                {errors.invalidCredentials.message}
              </Typography>
            )}
            <Grid item mt={3} xs={10}>
              <Controller
                name="country"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth {...field}>
                    <InputLabel {...field} variant="standard">
                      Country
                    </InputLabel>
                    <NativeSelect
                      inputProps={{
                        ...field,
                      }}
                    >
                      {countries.map((c, idx) => {
                        return (
                          <option key={idx} value={`${c}`}>
                            {c}
                          </option>
                        );
                      })}
                    </NativeSelect>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item>
              <Controller
                name="state"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField label="State" variant="standard" {...field} />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField label="City" variant="standard" {...field} />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="street"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField label="Street" variant="standard" {...field} />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="roomNumber"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="Room number"
                    variant="standard"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid>
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
          {props.type === FormType.ADD ? (
            <Button type="submit" color="success" disabled={!watch("password")}>
              Add
            </Button>
          ) : (
            <div>
              <Button type="submit" disabled={!watch("password")}>
                Edit
              </Button>
              <Button
                color="error"
                disabled={!watch("password")}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          )}

          <Typography>{successMessage}</Typography>
        </form>
      </Grid>
    </React.Fragment>
  );
};

export default AddressItem;
