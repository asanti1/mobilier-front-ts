import { getFurnituresAPI } from "../../api/mobilierApi";
import { AppDispatch, RootState } from "../store";
import { setFurnitures, startLoadingFurnitures } from "./furnituresSlice";

export const getFurnitures = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingFurnitures());

    const data = await getFurnituresAPI();

    dispatch(setFurnitures(data));
  };
};
