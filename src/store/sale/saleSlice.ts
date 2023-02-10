import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { GetSalesDto } from "../../api/dto/getSalesDto";
import { Sale } from "../../interfaces/sale";
import { User } from "../../interfaces/user";
import { SaleState } from "./interfaces/saleSliceState";

const initialState: SaleState = {
  sale: undefined,
  userSales: undefined,
  user: undefined,
  isLoading: false,
  total: 0,
};

export const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    startLoadingSales: (state) => {
      state.isLoading = true;
    },
    onClearUserSales: (state) => {
      return produce(state, (draft) => {
        draft = initialState;
      });
    },
    onAddActualSale: (
      state,
      action: PayloadAction<{ sale: Sale; user: User }>
    ) => {
      state.sale = action.payload.sale;
      state.user = action.payload.user;
    },
    onLoadUserSales: (state, action: PayloadAction<GetSalesDto>) => {
      return produce(state, (draft) => {
        draft.userSales = action.payload.userSales;
        draft.total = action.payload.total;
        draft.isLoading = false;
      });
    },
    onEditSaleStatus: (state, action: PayloadAction<{ _id: string }>) => {
      return produce(state, (draft) => {
        draft.userSales?.forEach((sale) => {
          if (sale._id === action.payload._id)
            if (sale.saleStatus === "Pending") {
              sale.saleStatus = "Completed";
            } else {
              sale.saleStatus = "Pending";
            }
        });
      });
    },
  },
});

export const {
  onAddActualSale,
  onLoadUserSales,
  onEditSaleStatus,
  onClearUserSales,
  startLoadingSales,
} = saleSlice.actions;
