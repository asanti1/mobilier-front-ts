import { ShopItem } from "../store/shoppingCart/interfaces/shoppingCartState";
import { Address } from "./address";

export interface Sale {
  userId: string;
  address: Address;
  shopList: ShopItem[];
  totalItemCost: number;
  saleStatus?: string;
}
