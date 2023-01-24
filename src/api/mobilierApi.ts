import axios from "axios";
import { Furniture } from "../interfaces/furniture";
import { LoginResponse } from "./dto/loginResponseDto";
import { UserCredentials } from "./dto/userLoginDto";

export const mobilierApi = axios.create({
  baseURL: "http://localhost:3000",
});

export let hasLoginFailed: string | undefined;

mobilierApi.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getFurnituresAPI = async () => {
  const { data } = await mobilierApi.get<Furniture[]>(`/furnitures`);
  return data;
};

export const loginAPI = async (
  loginCredentials: UserCredentials
): Promise<LoginResponse> => {
  const response = await mobilierApi
    .post("/auth/login", loginCredentials)
    .then(({ data: { accessToken, user } }) => {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      return Promise.resolve(user);
    })
    .catch((error) => {
      hasLoginFailed = error.response.data.message;
      return Promise.reject(error.response.data.message);
    });

  return response;
};
