import { SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system/";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { addASale } from "../../../api/mobilierApi";
import { useAppDispatch } from "../../../hooks/redux/useAppDispatch";
import { useAppSelector } from "../../../hooks/redux/useAppSelector";
import { onAddActualSale } from "../../../store/sale/saleSlice";
import { containerStyle } from "./styles";

const PrePurchaseAddressForm = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { shoppingCart } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [addr, setAddr] = useState<string>("");
  const {
    setError,
    formState: { errors },
  } = useForm<{ purchaseFailed: string }>();
  const [formValues, setFormValues] = useState<{
    addressId: string;
    country: string;
    state: string;
    city: string;
    street: string;
    roomNumber: string;
  }>({
    addressId: "",
    country: "",
    state: "",
    city: "",
    street: "",
    roomNumber: "",
  });

  const handleChange = (event: SelectChangeEvent) => {
    setAddr(event.target.value);

    setFormValues({
      addressId: user.address![parseInt(event.target.value)].addressId || "",
      country: user.address![parseInt(event.target.value)].country || "",
      state: user.address![parseInt(event.target.value)].state || "",
      city: user.address![parseInt(event.target.value)].city || "",
      street: user.address![parseInt(event.target.value)].street || "",
      roomNumber: user.address![parseInt(event.target.value)].roomNumber || "",
    });
  };

  const handleSubmit = async () => {
    try {
      const sale = await addASale({
        totalItemCost: shoppingCart.finalCost,
        userId: user._id!,
        address: formValues,
        shopList: shoppingCart.shopList,
      });
      dispatch(
        onAddActualSale({
          user: user,
          sale: sale!,
        })
      );
      navigate("/prePurchase/congratulations");
    } catch (error) {
      setError("purchaseFailed", {
        type: "custom",
        message: `${error}`,
      });
    }
  };

  return (
    <Grid container>
      <Container sx={containerStyle} maxWidth="md">
        <Typography variant="h5" mt={2}>
          Address
        </Typography>
        <Typography mt={2} variant="caption">
          (Always double check your data because we won't take responsability on
          wrong billing information after the purchase)
        </Typography>
        <br />
        {user.address?.length === 0 ? (
          <Typography component={ReactRouterLink} to="/profile" color="orange">
            it seems you didn't add an address yet, you can't proceed without
            adding one
          </Typography>
        ) : (
          <div>
            {errors.purchaseFailed === undefined ? null : (
              <Typography color="red">
                {errors.purchaseFailed.message}
              </Typography>
            )}
            <form>
              <FormControl>
                <Select
                  value={addr}
                  label="Address"
                  required
                  sx={{ width: "400px" }}
                  onChange={handleChange}
                >
                  {user.address!.map((add, idx) => {
                    const { addressId, ...rest } = add;
                    return (
                      <MenuItem key={idx} value={idx}>
                        {Object.values(rest).join(", ")}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Grid mt={2} mb={2}>
                <TextField
                  label="Country"
                  disabled
                  value={formValues.country}
                />
                <TextField label="State" disabled value={formValues.state} />
                <TextField label="City" disabled value={formValues.city} />
                <TextField label="Street" disabled value={formValues.street} />
                <TextField
                  label="Room Number"
                  disabled
                  value={formValues.roomNumber}
                />
              </Grid>
            </form>
            <Grid item>
              <Button
                type="submit"
                sx={{ alignItems: "end" }}
                onSubmit={() => handleSubmit()}
                onClick={() => handleSubmit()}
                disabled={addr === ""}
              >
                Finalize Purchase
              </Button>
            </Grid>
          </div>
        )}
      </Container>
    </Grid>
  );
};

export default PrePurchaseAddressForm;
