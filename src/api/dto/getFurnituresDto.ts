import { Furniture } from "../../interfaces/furniture";

export interface GetFurnituresDto {
  furnitures: Furniture[];
  skip: number;
  total: number;
}
