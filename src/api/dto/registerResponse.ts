import { User } from "../../interfaces/user";

export interface RegisterResponse {
  user?: User;
  status?: number;
  errorMessage?: string;
  accessToken?: string;
}
