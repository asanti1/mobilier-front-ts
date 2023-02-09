import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { Role } from "../../interfaces/role";
import { getAllUserSales } from "../../store/sale/thunks";
import Navbar from "../common/navbar/Navbar";
import Ticket from "../user/forms/Ticket";

const UserTickets = () => {
  const { roles } = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userSales, isLoading } = useAppSelector((state) => state.sale);
  const { state } = useLocation();

  useEffect(() => {
    dispatch(getAllUserSales(state.id));
  }, []);

  useEffect(() => {
    if (roles?.includes(Role.ADMIN)) return;
    navigate("/");
  }, []);

  return (
    <React.Fragment>
      <Navbar searchBarDisabled={true} shoppingCartDisabled={true} />
      {isLoading ? (
        <Typography>Loading Sales</Typography>
      ) : (
        userSales?.map((sale) => (
          <Ticket key={sale._id} sale={sale} roles={roles!} />
        ))
      )}
    </React.Fragment>
  );
};

export default UserTickets;
