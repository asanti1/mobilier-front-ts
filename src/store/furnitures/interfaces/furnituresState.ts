import { Furniture } from "../../../interfaces/furniture";

export interface FurnituresState {
  furnitures: Furniture[];
  isLoading: boolean;
  error: string | null;
}
