import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { GetFurnituresDto } from "../../api/dto/getFurnituresDto";
import { Furniture } from "../../interfaces/furniture";
import { RootState } from "../store";
import { FurnituresState } from "./interfaces/furnituresState";

const initialState: FurnituresState = {
  furnitures: [],
  isLoading: false,
  error: null,
  total: 0,
};

export const furnitureSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {
    startLoadingFurnitures: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setFurnitures: (state, action: PayloadAction<GetFurnituresDto>) => {
      state.isLoading = false;
      state.furnitures = action.payload.furnitures;
      state.error = null;
      state.total = action.payload.total;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.furnitures = [];
      state.error = action.payload;
    },
    onDeleteFurniture: (state, action: PayloadAction<string>) => {
      return produce(state, (draft) => {
        const index = draft.furnitures.findIndex(
          (item) => item._id === action.payload
        );
        if (index !== -1) {
          draft.furnitures.splice(index, 1);
        }
      });
    },
  },
});

//FUTURE: CAN BE OF HELP
export const furnituresExtract = (state: RootState) =>
  state.furnitures.furnitures;

export const {
  startLoadingFurnitures,
  setFurnitures,
  setError,
  onDeleteFurniture,
} = furnitureSlice.actions;
