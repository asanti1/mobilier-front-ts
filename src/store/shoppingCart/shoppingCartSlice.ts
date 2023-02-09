import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { ShopItem, ShoppingCartState } from "./interfaces/shoppingCartState";

const initialState: ShoppingCartState = {
  userId: "",
  addressId: "",
  shopList: [],
  finalCost: 0,
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    onClearCart: (state) => {
      state.userId = "";
      state.addressId = "";
      state.shopList = [];
      state.finalCost = 0;
    },
    onCalculateFinalCost: (state) => {
      return produce(state, (draft) => {
        draft.finalCost = state.shopList.reduce(
          (acc, val) => acc + val.cost,
          0
        );
      });
    },
    onSetAmount: (
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) => {
      return produce(state, (draft) => {
        const index = draft.shopList.findIndex(
          (item) => item.furnitureId === action.payload.id
        );
        if (index !== -1) {
          draft.shopList[index].quantity = 1;
          draft.shopList[index].cost = 0;
          draft.shopList[index].quantity = action.payload.amount;
          draft.shopList[index].cost =
            draft.shopList[index].quantity * draft.shopList[index].costPerItem;
        }
      });
    },
    onDecrease: (state, action: PayloadAction<{ id: string }>) => {
      return produce(state, (draft) => {
        const index = draft.shopList.findIndex(
          (item) => item.furnitureId === action.payload.id
        );
        if (index !== -1) {
          draft.shopList[index].quantity -= 1;
          draft.shopList[index].cost =
            draft.shopList[index].quantity * draft.shopList[index].costPerItem;
        }
      });
    },
    onIncrease: (state, action: PayloadAction<{ id: string }>) => {
      return produce(state, (draft) => {
        const index = draft.shopList.findIndex(
          (item) => item.furnitureId === action.payload.id
        );
        if (index !== -1) {
          draft.shopList[index].quantity += 1;
          draft.shopList[index].cost =
            draft.shopList[index].quantity * draft.shopList[index].costPerItem;
        }
      });
    },
    addTocart: (state, action: PayloadAction<ShopItem>) => {
      return produce(state, (draft) => {
        const index = draft.shopList.findIndex(
          (item) => item.furnitureId === action.payload.furnitureId
        );
        if (index !== -1) {
          draft.shopList[index].cost += action.payload.cost;
          draft.shopList[index].quantity += action.payload.quantity;
        } else {
          draft.shopList.push(action.payload);
        }
      });
    },
    onDeleteItem: (state, action: PayloadAction<{ id: string }>) => {
      return produce(state, (draft) => {
        const index = draft.shopList.findIndex(
          (item) => item.furnitureId === action.payload.id
        );
        if (index !== -1) draft.shopList.splice(index, 1);
      });
    },
  },
});

export const {
  addTocart,
  onIncrease,
  onCalculateFinalCost,
  onDecrease,
  onDeleteItem,
  onClearCart,
  onSetAmount,
} = shoppingCartSlice.actions;
