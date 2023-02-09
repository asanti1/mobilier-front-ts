import {
  deleteFurnitureByIdAPI,
  getFurnituresAPI,
  getFurnituresByNameAPI,
} from "../../api/mobilierApi";
import { AppDispatch } from "../store";
import {
  onDeleteFurniture,
  setFurnitures,
  startLoadingFurnitures,
} from "./furnituresSlice";

export const getFurnitures = (skip: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingFurnitures());

    const data = await getFurnituresAPI(skip);

    dispatch(setFurnitures(data));
  };
};

export const getFurnituresByName = (search: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingFurnitures());

    const data = await getFurnituresByNameAPI(search);
    dispatch(setFurnitures(data));
  };
};

export const deleteFurnitureById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    await deleteFurnitureByIdAPI(id);
    dispatch(onDeleteFurniture(id));
  };
};
