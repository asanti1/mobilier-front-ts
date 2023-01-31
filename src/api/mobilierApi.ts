import axios, { AxiosResponse, AxiosError } from "axios";
import { Address } from "../interfaces/address";
import { Furniture } from "../interfaces/furniture";
import { User } from "../interfaces/user";
import { UpdateUserDto } from "../interfaces/user/updateUserDto";
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

export const loginAPI = async (loginCredentials: UserCredentials) => {
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

export const registerAPI = async (userForm: User) => {
  const response = await mobilierApi
    .post("/auth/register", userForm)
    .then(({ data: { accessToken, user } }) => {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      return Promise.resolve(user);
    })
    .catch((error) => {
      return Promise.reject(error.response.data.message);
    });
  return response;
};

export const tokenRefreshAPI = async (
  loginCreds: UserCredentials
): Promise<void> => {
  return await mobilierApi
    .post("auth/tokenRefresh", loginCreds)
    .then(({ data: { accessToken } }) => {
      hasLoginFailed = undefined;
      localStorage.clear();
      localStorage.setItem("token", accessToken);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
    })
    .catch((error) => {
      hasLoginFailed = error.response.data.message;
      throw new Error(error.response.data.message);
    });
};

export const modifyUserById = async (id: string, fields: UpdateUserDto) => {
  try {
    if (fields.password) {
      const {
        data: { email, phone },
      } = await mobilierApi.patch<UpdateUserDto>(`/users/${id}`, {
        password: fields.password,
      });
      return { email, phone };
    } else {
      const {
        data: { email, phone, password },
      } = await mobilierApi.patch<UpdateUserDto>(`/users/${id}`, {
        email: fields.email,
        phone: fields.phone,
      });
      return { email, phone };
    }
  } catch (error: Error | any) {
    console.log(error);

    throw new Error(error.response.data.message);
  }
};

export const getUserById = async (id: string) => {
  const { status } = await mobilierApi.get(`/users/${id}`);
  return status;
};

export const modifyAddressById = async (userId: string, address: Address) => {
  try {
    await mobilierApi.put(`/users/address/${userId}`, address);
  } catch (error: Error | any) {
    throw new Error(error.response.data.message);
  }
};
export const addAnAddressAPI = async (
  userId: string,
  { country, state, city, street, roomNumber }: Address
): Promise<Address[]> => {
  try {
    const {
      data: { address },
    } = await mobilierApi.put<User>(`/users/${userId}`, {
      country,
      state,
      city,
      street,
      roomNumber,
    });
    return address!;
  } catch (error: Error | any) {
    throw new Error(error.response.data.message);
  }
};
export const deleteAnAddressById = async (
  userId: string,
  addressId: string
) => {
  try {
    await mobilierApi.delete(`/users/address/${userId}/${addressId}`);
  } catch (error: Error | any) {
    throw new Error(error.response.data.message);
  }
};
