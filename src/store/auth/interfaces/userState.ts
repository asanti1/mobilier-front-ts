import { User } from "../../../interfaces/user";

export enum Status {
  NOT_AUTHENTICATED = "not-authenticated",
  CHECKING = "checking",
  AUTHENTICATED = "authenticated",
}

export interface UserState {
  user: User;
  status: Status;
  error?: string;
}
