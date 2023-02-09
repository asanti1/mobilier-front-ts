import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { RefObject, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { onClearCart } from "../../store/shoppingCart/shoppingCartSlice";
import Navbar from "../common/navbar/Navbar";
import generatePDF from "./pdfGenerator";

const Congratulations = () => {
  const { sale } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onClearCart());
  }, []);

  return (
    <React.Fragment>
      <Navbar searchBarDisabled={true} shoppingCartDisabled={true} />

      <Typography variant="h5" mt="25px" ml="90px">
        Thank you for shopping with us! <br /> The furnitures will be at your
        home in 4-5 work days
      </Typography>
      <div>
        <Container
          sx={{
            position: "relative",
            alignItems: "center",
            marginTop: "15vh",
          }}
          maxWidth="lg"
        >
          <Grid container maxWidth="lg">
            <Grid item xs={6}>
              <List>
                <Divider />
                <ListItem> Person who will receive: </ListItem>
                <Divider />
                <ListItem>First Name: {sale.user?.firstName}</ListItem>
                <ListItem>Last Name: {sale.user?.lastName}</ListItem>
                <ListItem>Email: {sale.user?.email}</ListItem>
                <ListItem>Phone: {sale.user?.phone}</ListItem>
              </List>
            </Grid>
            <Grid item xs={6}>
              <List>
                <Divider />
                <ListItem>Address to be sent: </ListItem>
                <Divider />
                <ListItem>Country: {sale.sale?.address.country}</ListItem>
                <ListItem>State: {sale.sale?.address.state}</ListItem>

                <ListItem>City: {sale.sale?.address.city}</ListItem>

                <ListItem>Street: {sale.sale?.address.street}</ListItem>
                <ListItem>
                  Room Number: {sale.sale?.address.roomNumber}
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Divider />
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
                {sale.sale!.shopList.map((item) => (
                  <TableRow key={item.furnitureId}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell>$ {item.cost}</TableCell>
                    <TableCell>$ {item.costPerItem}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell>Final Cost: ${sale.sale?.totalItemCost}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>

      <Typography mt="15px" ml="35vw">
        <Button
          type="button"
          onClick={() => {
            generatePDF(sale.sale!, sale.user!);
          }}
        >
          Download your ticket
        </Button>
      </Typography>
    </React.Fragment>
  );
};

export default Congratulations;
