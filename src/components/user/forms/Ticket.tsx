import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { FormControlLabel, FormGroup } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/redux/useAppDispatch";
import { SaleFromBe } from "../../../interfaces/salesFromBE";
import { onEditSaleStatus } from "../../../store/sale/saleSlice";
import { Role } from "../../../interfaces/role";
import { updateStatusAPI } from "../../../api/mobilierApi";

export type TicketProp = {
  sale: SaleFromBe;
  roles: Role[];
};

const Ticket = (props: TicketProp) => {
  const [checked, setChecked] = useState(props.sale.saleStatus === "Completed");
  let date = new Date(props.sale.createdAt).toDateString();
  const dispatch = useAppDispatch();

  const handleChange = () => {
    setChecked(!checked);
    updateStatusAPI(props.sale._id);
    dispatch(onEditSaleStatus({ _id: props.sale._id }));
  };

  return (
    <>
      <Accordion
        sx={{ width: "90vw", justifySelf: "center", marginTop: "10px" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ backgroundColor: grey[900] }}
        >
          <Typography
            color={checked ? "green" : "white"}
          >{`${date} - Spent $${props.sale.totalItemCost}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              <TableContainer sx={{ backgroundColor: grey[900] }}>
                {props.roles.includes(Role.ADMIN) ? (
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox onChange={handleChange} checked={checked} />
                      }
                      label={props.sale.saleStatus}
                    />
                  </FormGroup>
                ) : (
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox disabled checked={checked} />}
                      label={props.sale.saleStatus}
                    />
                  </FormGroup>
                )}
                <Table sx={{ minWidth: "80vw" }}>
                  <TableHead>
                    <TableRow></TableRow>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Total Cost</TableCell>
                      <TableCell>Item Cost</TableCell>
                      <TableCell>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.sale.shopList.map((item) => (
                      <TableRow key={item.furnitureId}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.cost}</TableCell>
                        <TableCell>{item.costPerItem}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Ticket;
