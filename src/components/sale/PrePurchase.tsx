import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/system";
import React from "react";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import Navbar from "../common/navbar/Navbar";
import PrePurchaseAddressForm from "./forms/PrePurchaseAddressForm";

const PrePurchase = () => {
  const { shoppingCart } = useAppSelector((state) => state);

  return (
    <React.Fragment>
      <Navbar shoppingCartDisabled={true} searchBarDisabled={true} />
      <Container sx={{ marginTop: "3vh" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Item Cost</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shoppingCart.shopList.map((item) => (
                <TableRow key={item.furnitureId}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.cost}</TableCell>
                  <TableCell>{item.costPerItem}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <PrePurchaseAddressForm />
    </React.Fragment>
  );
};

export default PrePurchase;
