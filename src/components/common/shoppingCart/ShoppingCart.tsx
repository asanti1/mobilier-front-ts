import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import React from "react";
import { Link as LinkReactRouterDom } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux/useAppSelector";
import ShoppingCartButtons from "./ShoppingCartButtons";
import { generalCartButtonStyle } from "./styles/GeneralCart.styles";
function ShoppingCart() {
  const { shopList, finalCost } = useAppSelector((state) => state.shoppingCart);
  const [state, setState] = React.useState(false);

  const toggleDrawer = () => {
    setState((state) => !state);
  };

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer} sx={generalCartButtonStyle}>
        <ShoppingCartTwoToneIcon />
      </Button>
      <Grid justifyContent="end">
        <Drawer
          anchor="top"
          open={state}
          onClose={toggleDrawer}
          PaperProps={{
            sx: {
              left: "calc(50% - 15px)",
              width: "500px",
              justifyContent: "end",
              alignContent: "end",
            },
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Cost Per Item</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              {shopList.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell>No items bought yet</TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {shopList.map((item) => (
                    <TableRow key={item.furnitureId}>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell>{item.costPerItem}</TableCell>
                      <TableCell>{item.cost}</TableCell>
                      <TableCell>
                        <ShoppingCartButtons
                          initialAmount={item.quantity}
                          item={item}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
              <TableFooter>
                <TableRow>
                  <TableCell>Final Cost: </TableCell>
                  <TableCell>{finalCost}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    {shopList.length !== 0 ? (
                      <Link component={LinkReactRouterDom} to={"/prePurchase"}>
                        Define last details before payment
                      </Link>
                    ) : null}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Drawer>
      </Grid>
    </React.Fragment>
  );
}

export default ShoppingCart;
