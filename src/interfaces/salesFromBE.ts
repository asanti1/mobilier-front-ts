import { ShopItem } from "../store/shoppingCart/interfaces/shoppingCartState";
import { Address } from "./address";

export interface SaleFromBe {
  _id: string;
  userId: string;
  address: Address;
  shopList: ShopItem[];
  totalItemCost: number;
  createdAt: Date;
  updatedAt: Date;
  saleStatus: string;
  __v: number;
}
