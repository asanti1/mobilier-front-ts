import Grid from "@mui/material/Grid";
import Container from "@mui/system/Container";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { getFurnitures } from "../../store/furnitures/thunks";
import FurnitureCard from "./FurnitureCard";

const FurnitureGrid = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFurnitures());
  }, []);

  const { furnitures } = useAppSelector((selector) => selector.furnitures);

  /*spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 */

  return (
    <React.Fragment>
      <Grid
        container
        spacing={4}
        marginTop="15vh"
        marginLeft="10px"
        maxWidth="90vw"
        columns={{ xs: 1, sm: 4, md: 12, lg: 12 }}
      >
        {furnitures.map((f, id) => {
          return <FurnitureCard furniture={f} key={id} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default FurnitureGrid;
