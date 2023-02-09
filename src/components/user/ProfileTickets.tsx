import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { getAllUserSales } from "../../store/sale/thunks";
import Ticket from "./forms/Ticket";
import { TabPanelProps } from "./UserProfile";

const ProfileTickets = (props: TabPanelProps) => {
  const { value, index } = props;
  const { _id, roles } = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { userSales, isLoading } = useAppSelector((state) => state.sale);

  useEffect(() => {
    dispatch(getAllUserSales(_id!));
  }, []);

  return (
    <React.Fragment>
      {value === index ? (
        isLoading ? (
          <Typography>Loading Sales</Typography>
        ) : (
          userSales?.map((sale) => (
            <Ticket key={sale._id} sale={sale} roles={roles!} />
          ))
        )
      ) : null}
    </React.Fragment>
  );
};

export default ProfileTickets;
