import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  addAnAddressAPI,
  deleteAnAddressById,
  hasLoginFailed,
  modifyAddressById,
  tokenRefreshAPI,
} from "../../api/mobilierApi";
import { LoginErrorTypes } from "../../auth/login/types";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { Address } from "../../interfaces/address";
import { typographyErrorStyle } from "../../material/errorStyle";
import {
  addAnAddress,
  deleteAnAddress,
  updateAnAddress,
} from "../../store/auth/authSlice";
import AddressUserProfileForm from "./forms/AddressForm";
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
  const methods = useForm({ defaultValues });

  const onError = (errors: LoginErrorTypes) => {
    if (errors.invalidCredentials) {
      methods.clearErrors("invalidCredentials");
      onSubmit(methods.getValues());
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
      methods.resetField("password");
      setTimeout(() => {
        setSuccessMessage(() => "");
      }, 2000);
    } catch (error) {
      methods.setError("invalidCredentials", {
        type: "custom",
        message: `${hasLoginFailed}`,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await tokenRefreshAPI({
        email: email!,
        password: methods.getValues("password"),
      });
      try {
        await deleteAnAddressById(_id!, addressId!);
        dispatch(deleteAnAddress(props.id!));
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      methods.setError("invalidCredentials", {
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
        <Typography variant="h6">{props.title}</Typography>
        {methods.formState.errors.invalidCredentials && (
          <Typography
            variant="subtitle1"
            sx={typographyErrorStyle}
            marginTop={2}
          >
            {methods.formState.errors.invalidCredentials.message}
          </Typography>
        )}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <AddressUserProfileForm />
            {props.type === FormType.ADD ? (
              <Button
                type="submit"
                color="success"
                disabled={!methods.watch("password")}
              >
                Add
              </Button>
            ) : (
              <div>
                <Button type="submit" disabled={!methods.watch("password")}>
                  Edit
                </Button>
                <Button
                  color="error"
                  disabled={!methods.watch("password")}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            )}

            <Typography>{successMessage}</Typography>
          </form>
        </FormProvider>
      </Grid>
    </React.Fragment>
  );
};

export default AddressItem;
