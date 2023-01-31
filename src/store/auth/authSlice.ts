import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { Address } from "../../interfaces/address";
import { UpdateUserDto } from "../../interfaces/user/updateUserDto";
import { UpdateAddressArray } from "./interfaces/updateAddressArray";
import { Status, UserState } from "./interfaces/userState";
import { login, register } from "./thunks";

export const initialState: UserState = {
  user: {},
  status: Status.NOT_AUTHENTICATED,
  error: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.status = Status.NOT_AUTHENTICATED;
      state.user = {};
      state.error = undefined;
    },
    clearErrorMessage: (state) => {
      state.error = undefined;
    },
    updateUserInformation: (state, action: PayloadAction<UpdateUserDto>) => {
      return produce(state, (draft) => {
        draft.user.email = action.payload.email;
        draft.user.phone = action.payload.phone;
      });
    },
    updateAnAddress: (state, action: PayloadAction<UpdateAddressArray>) => {
      return produce(state, (draft) => {
        draft.user.address![action.payload.index] = action.payload.address;
      });
    },
    addAnAddress: (state, action: PayloadAction<Address>) => {
      return produce(state, (draft) => {
        draft.user.address?.push(action.payload);
      });
    },
    deleteAnAddress: (state, action: PayloadAction<number>) => {
      return produce(state, (draft) => {
        draft.user.address?.splice(action.payload, 1);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = Status.CHECKING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = Status.AUTHENTICATED;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = Status.NOT_AUTHENTICATED;
      })
      .addCase(register.pending, (state) => {
        state.status = Status.CHECKING;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = Status.AUTHENTICATED;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = Status.NOT_AUTHENTICATED;
      });
  },
});

export const {
  clearUser,
  clearErrorMessage,
  updateUserInformation,
  updateAnAddress,
  addAnAddress,
  deleteAnAddress,
} = authSlice.actions;
