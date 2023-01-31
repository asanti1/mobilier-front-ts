import { Address } from "./address";
import { Role } from "./role";

export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: Address[];
  roles?: Role[];
  _id?: string;
}
