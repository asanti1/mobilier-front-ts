import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Furniture } from "../../interfaces/furniture";
import { RootState } from "../store";
import { FurnituresState } from "./interfaces/furnituresState";

const initialState: FurnituresState = {
  furnitures: [],
  isLoading: false,
  error: null,
};

export const furnitureSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {
    startLoadingFurnitures: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setFurnitures: (state, action: PayloadAction<Furniture[]>) => {
      state.isLoading = false;
      state.furnitures = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.furnitures = [];
      state.error = action.payload;
    },
  },
});

//FUTURE: CAN BE OF HELP
export const furnituresExtract = (state: RootState) =>
  state.furnitures.furnitures;

export const { startLoadingFurnitures, setFurnitures, setError } =
  furnitureSlice.actions;
