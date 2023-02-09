import ArrowLeftTwoToneIcon from "@mui/icons-material/ArrowLeftTwoTone";
import ArrowRightTwoToneIcon from "@mui/icons-material/ArrowRightTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useAppDispatch } from "../../../hooks/redux/useAppDispatch";
import { ShopItem } from "../../../store/shoppingCart/interfaces/shoppingCartState";
import {
  onCalculateFinalCost,
  onDecrease,
  onDeleteItem,
  onIncrease,
  onSetAmount,
} from "../../../store/shoppingCart/shoppingCartSlice";
import {
  generalCartItemButtonRowStyle,
  generalCartItemTextStyle,
} from "./styles/GeneralCart.styles";

export type ShoppingCartButtonsProps = {
  initialAmount: number;
  item: ShopItem;
};

const ShoppingCartButtons = (props: ShoppingCartButtonsProps) => {
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState<number>(props.initialAmount);

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
    dispatch(onDecrease({ id: props.item.furnitureId }));
    dispatch(onCalculateFinalCost());
  };

  const increase = () => {
    setCounter(counter + 1);
    dispatch(onIncrease({ id: props.item.furnitureId }));
    dispatch(onCalculateFinalCost());
  };

  const deleteItem = () => {
    dispatch(onDeleteItem({ id: props.item.furnitureId }));
    dispatch(onCalculateFinalCost());
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained">
        <Button sx={generalCartItemButtonRowStyle} onClick={decrease}>
          <ArrowLeftTwoToneIcon />
        </Button>
        <Button sx={generalCartItemButtonRowStyle} onClick={increase}>
          <ArrowRightTwoToneIcon />
        </Button>
        <TextField
          value={counter}
          onChange={(e) => handleChange(parseInt(e.target.value) || 1)}
          size="small"
          disabled
          sx={generalCartItemTextStyle}
          InputProps={{ style: { fontSize: 12 } }}
        />
        <Button sx={generalCartItemButtonRowStyle} onClick={deleteItem}>
          <DeleteOutlineTwoToneIcon />
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default ShoppingCartButtons;
