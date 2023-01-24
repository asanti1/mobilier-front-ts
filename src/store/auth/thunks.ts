import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginResponse } from "../../api/dto/loginResponseDto";
import { UserCredentials } from "../../api/dto/userLoginDto";
import { loginAPI } from "../../api/mobilierApi";
import { AppDispatch, RootState } from "../store";
import { clearErrorMessage, selectError } from "./authSlice";

interface KnownError {
  errorMessage: string;
}

export const login = createAsyncThunk<
  LoginResponse,
  UserCredentials,
  { rejectValue: string }
>("auth/login", async (loginCredentials: UserCredentials) => {
  const response = loginAPI(loginCredentials);
  return response;
});

export const getError = () => {
  return (getState: RootState) => {
    const state = selectError;

    const error = state;
    return { error };
  };
};

export const loginErrorsClear = () => {
  return (dispatch: AppDispatch) => {
    return dispatch(clearErrorMessage());
  };
};
