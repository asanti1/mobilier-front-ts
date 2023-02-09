import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
export interface TabPanelProps {
  index: number;
  value: number;
}

const UsersTable = (props: TabPanelProps) => {
  const { value, index } = props;
  const { users } = useAppSelector((state) => state.users);
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate("/administration/userTickets", { state: { id: id } });
  };

  return (
    <React.Fragment>
      {value === index && (
        <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>View tickets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((userRow) => (
                <TableRow key={userRow._id}>
                  <TableCell component="th" scope="row">
                    {userRow.lastName}, {userRow.firstName}
                  </TableCell>
                  <TableCell>{userRow.email}</TableCell>
                  <TableCell>{userRow.phone}</TableCell>
                  <TableCell>{userRow.roles?.join(", ")}</TableCell>
                  <TableCell component="td">
                    <Button onClick={() => handleClick(userRow._id!)}>
                      View user tickets
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  );
};

export default UsersTable;
