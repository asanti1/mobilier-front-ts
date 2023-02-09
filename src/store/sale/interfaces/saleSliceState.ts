import { Sale } from "../../../interfaces/sale";
import { SaleFromBe } from "../../../interfaces/salesFromBE";
import { User } from "../../../interfaces/user";

export interface SaleState {
  sale?: Sale;
  userSales?: SaleFromBe[];
  user?: User;
  total: number;
  isLoading: boolean;
}
