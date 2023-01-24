import { User } from "../../interfaces/user";

export interface LoginResponse {
  user?: User;
  status?: number;
  errorMessage?: string;
  accessToken?: string;
}
