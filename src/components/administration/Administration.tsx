import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { getUsers } from "../../store/administration/users/thunks";
import Navbar from "../common/navbar/Navbar";
import AdministrationBar from "./AdministrationBar";

const Administration = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <React.Fragment>
      <Navbar searchBarDisabled={true} shoppingCartDisabled={true} />
      <AdministrationBar />
    </React.Fragment>
  );
};

export default Administration;
