import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./administration/users/usersSlice";
import { authSlice } from "./auth/authSlice";
import { furnitureSlice } from "./furnitures/furnituresSlice";
import { saleSlice } from "./sale/saleSlice";
import { shoppingCartSlice } from "./shoppingCart/shoppingCartSlice";

export const store = configureStore({
  reducer: {
    furnitures: furnitureSlice.reducer,
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    sale: saleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
