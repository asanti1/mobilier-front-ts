import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserCredentials } from "../../api/dto/userLoginDto";
import { loginAPI, registerAPI } from "../../api/mobilierApi";
import { User } from "../../interfaces/user";

export const login = createAsyncThunk(
  "auth/login",
  async (loginCredentials: UserCredentials) => {
    const response = await loginAPI(loginCredentials);
    return response;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (user: User) => {
    const response = await registerAPI(user);

    return response;
  }
);
