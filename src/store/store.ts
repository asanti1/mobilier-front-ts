import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { furnitureSlice } from "./furnitures/furnituresSlice";

export const store = configureStore({
  reducer: {
    furnitures: furnitureSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
