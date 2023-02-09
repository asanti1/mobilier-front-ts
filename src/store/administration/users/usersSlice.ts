import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { User } from "../../../interfaces/user";
import { UsersState } from "./interfaces/usersState";

export const initialState: UsersState = {
  users: [],
  areLoading: false,
  error: undefined,
};

export const usersSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onUsersLoading: (state) => {
      state.areLoading = true;
    },
    clearUsers: (state) => {
      state.areLoading = false;
      state.users = [];
      state.error = undefined;
    },
    clearErrorMessage: (state) => {
      state.error = undefined;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.areLoading = false;
      state.users = action.payload;
      state.error = undefined;
    },
  },
});

export const { clearUsers, clearErrorMessage, setUsers, onUsersLoading } =
  usersSlice.actions;
