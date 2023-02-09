export interface ShopItem {
  name: string;
  furnitureId: string;
  quantity: number;
  cost: number;
  costPerItem: number;
}

export interface ShoppingCartState {
  userId: string;
  addressId: string;
  shopList: ShopItem[];
  finalCost: number;
}
