import React from "react";
import { SeeMoreProps } from "./interfaces/SeeMore";
import { Container, Grid, Typography } from "@mui/material";
import { containerStyle } from "../user/styles";
import CartItemHandler from "./CartItemHandler";
import Image from "mui-image";

const SeeMoreAsUser = (props: SeeMoreProps) => {
  return (
    <React.Fragment>
      <Container sx={containerStyle} maxWidth="md">
        <Typography variant="h4" marginTop={2}>
          {props.furniture.name}
        </Typography>
        <Grid container maxWidth="md">
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={3} padding="10px">
              <Image
                src="../src/assets/placeholder.png"
                alt="image"
                width="200px"
                height="200px"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} padding="10px">
              <Typography>Cost: ${props.furniture.cost}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={12} padding="10px">
              <Typography>Stock: {props.furniture.stock}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} padding="10px">
              <Typography>
                Description: {props.furniture.description}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" mt={2}>
            Furniture Dimentions
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} padding="10px">
              <Typography>Depth: {props.furniture.depthZ} cm</Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} padding="10px">
              <Typography>Height: {props.furniture.heightX} cm</Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} padding="10px">
              <Typography>Width: {props.furniture.widthY} cm</Typography>
            </Grid>
          </Grid>
          <Typography variant="h6">Wood Type</Typography>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} padding="10px">
              <Typography>Wood: {props.furniture.wood}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} padding="10px">
              <CartItemHandler furniture={props.furniture} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default SeeMoreAsUser;
