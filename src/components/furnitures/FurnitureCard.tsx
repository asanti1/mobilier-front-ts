import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Furniture } from "../../interfaces/furniture";

const FurnitureCard = (props: { furniture: Furniture }): JSX.Element => {
  const { furniture } = props;

  return (
    <React.Fragment>
      <Grid
        item
        xs={2}
        sm={2}
        md={4}
        lg={3}
        sx={{ height: "50vh", mb: "170px" }}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div" sx={{ marginTop: "1px" }}>
              {furniture.name}
            </Typography>
            <CardMedia
              sx={{ height: 190 }}
              image="../src/assets/placeholder.png"
            />

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {furniture.description}
            </Typography>
            <List>
              <ListItem>
                <ListItemText> Cost: {furniture.cost}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText> Stock: {furniture.stock}</ListItemText>
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default FurnitureCard;
