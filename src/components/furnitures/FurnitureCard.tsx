import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { Furniture } from "../../interfaces/furniture";
import { Status } from "../../store/auth/interfaces/userState";
import CartItemHandler from "./CartItemHandler";
import placeholder from "../../assets/placeholder.png";

export type FurnitureCardProps = {
  furniture: Furniture;
  id: number;
};

const FurnitureCard = (props: FurnitureCardProps): JSX.Element => {
  const { status } = useAppSelector((state) => state.auth);
  const { furniture } = props;
  const navigate = useNavigate();
  const handleSeeMore = () => {
    navigate(`/${props.id}`, {
      state: { id: props.id, furniture: props.furniture },
    });
  };

  return (
    <React.Fragment>
      <Grid item xs={2} sm={2} md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{ borderColor: furniture.stock === 0 ? "red" : null }}
        >
          <CardContent>
            <Typography variant="h5" sx={{ marginTop: "1px" }}>
              {furniture.name.substring(0, 22)}
            </Typography>
            <CardMedia
              sx={{ height: 190 }}
              image={placeholder}
              /* image="../src/assets/placeholder.png" */
            />

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {furniture.description?.substring(0, 25)}...
            </Typography>
            <List>
              <ListItem>
                <ListItemText> Cost: ${furniture.cost}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText> Stock: {furniture.stock} Units</ListItemText>
              </ListItem>
            </List>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-around" }}>
            {status === Status.AUTHENTICATED ? (
              <Button size="small" onClick={handleSeeMore}>
                See more
              </Button>
            ) : null}
            {status === Status.AUTHENTICATED ? (
              <Box justifyContent="end" alignContent="end">
                <CartItemHandler furniture={furniture} />
              </Box>
            ) : null}
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default FurnitureCard;
