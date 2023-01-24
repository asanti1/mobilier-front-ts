import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user";
import { RootState } from "../store";
import { Status, UserState } from "./interfaces/userState";
import { login } from "./thunks";

export const initialState: UserState = {
  user: {},
  status: Status.NOT_AUTHENTICATED,
  error: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = Status.CHECKING;
      state.user = {};
      state.error = undefined;
    },
    onLogin: (state, action: PayloadAction<User>) => {
      state.status = Status.AUTHENTICATED;
      state.user = action.payload;
      state.error = undefined;
    },
    onLogout: (state, action: PayloadAction<string>) => {
      state.status = Status.NOT_AUTHENTICATED;
      state.user = {};
      state.error = action.payload;
    },
    clearErrorMessage: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = Status.CHECKING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user!;
        state.status = Status.AUTHENTICATED;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = Status.NOT_AUTHENTICATED;
      });
  },
});

export const selectError = (state: RootState) => state.auth.error;

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
