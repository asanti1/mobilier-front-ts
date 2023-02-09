import React from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { Role } from "../../interfaces/role";
import Navbar from "../common/navbar/Navbar";
import SeeMoreAsAdmin from "./SeeMoreAsAdmin";
import SeeMoreAsUser from "./SeeMoreAsUser";

const FurnitureItem = () => {
  const { state } = useLocation();
  const { roles } = useAppSelector((state) => state.auth.user);

  return (
    <React.Fragment>
      <Navbar />
      {roles?.includes(Role.ADMIN) ? (
        <SeeMoreAsAdmin furniture={state.furniture} id={state.id} />
      ) : (
        <SeeMoreAsUser furniture={state.furniture} id={state.id} />
      )}
    </React.Fragment>
  );
};

export default FurnitureItem;
