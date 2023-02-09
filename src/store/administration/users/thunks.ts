import { getUsersAPI } from "../../../api/mobilierApi";
import { AppDispatch } from "../../store";
import { onUsersLoading, setUsers } from "./usersSlice";

export const getUsers = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(onUsersLoading());

    const users = await getUsersAPI();

    dispatch(setUsers(users!));
  };
};
