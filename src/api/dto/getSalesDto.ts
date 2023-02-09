import { SaleFromBe } from "../../interfaces/salesFromBE";

export interface GetSalesDto {
  userSales: SaleFromBe[];
  total: number;
}
