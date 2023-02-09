import { getAllUserSalesAPI } from "../../api/mobilierApi";
import { AppDispatch } from "../store";
import {
  onClearUserSales,
  onLoadUserSales,
  startLoadingSales,
} from "./saleSlice";

export const getAllUserSales = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(onClearUserSales());
    dispatch(startLoadingSales());
    const data = await getAllUserSalesAPI(id);

    dispatch(onLoadUserSales(data));
  };
};
