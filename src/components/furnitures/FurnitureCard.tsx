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
