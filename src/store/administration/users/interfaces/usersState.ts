import { User } from "../../../../interfaces/user";

export interface UsersState {
  users: User[];
  areLoading: boolean;
  error?: string;
}
