import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import ArrowLeftTwoToneIcon from "@mui/icons-material/ArrowLeftTwoTone";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { Furniture } from "../../interfaces/furniture";
import {
  addTocart,
  onCalculateFinalCost,
} from "../../store/shoppingCart/shoppingCartSlice";
import { cartItemHandlerButton } from "../common/styles/CartItemHandler.styles";

const pattern = /[^0-9]/g;

export type PropTypesCartItemHandler = {
  furniture: Furniture;
};

const CartItemHandler = (props: PropTypesCartItemHandler) => {
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState<number>(1);

  const handleChange = (n: number) => {
    if (n < 1) {
      setCounter(1);
      return;
    } else {
      setCounter(n);
    }
  };

  const decrease = () => {
    if (counter === 1) return;
    setCounter(counter - 1);
  };

  const handleAddToCart = () => {
    dispatch(
      addTocart({
        costPerItem: props.furniture.cost!,
        name: props.furniture.name!,
        cost: props.furniture.cost! * counter,
        furnitureId: props.furniture._id,
        quantity: counter,
      })
    );
    dispatch(onCalculateFinalCost());
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained">
        <Button sx={cartItemHandlerButton} onClick={decrease}>
          <ArrowLeftTwoToneIcon />
        </Button>
        <Button
          sx={cartItemHandlerButton}
          onClick={() => setCounter(counter + 1)}
        >
          <ArrowRightTwoToneIcon />
        </Button>
        <TextField
          value={counter}
          onChange={(e) => handleChange(parseInt(e.target.value) || 1)}
          size="small"
          style={{
            maxWidth: "45px",
            minWidth: "45px",
            minHeight: "10px",
            maxHeight: "10px",
          }}
        />
        <Button sx={cartItemHandlerButton} onClick={handleAddToCart}>
          <AddShoppingCartTwoToneIcon />
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default CartItemHandler;
