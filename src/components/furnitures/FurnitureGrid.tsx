import { Pagination } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { Furniture } from "../../interfaces/furniture";
import { getFurnitures } from "../../store/furnitures/thunks";
import FurnitureCard from "./FurnitureCard";

const FurnitureGrid = React.memo((): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFurnitures(1));
  }, []);

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    dispatch(getFurnitures(value));
    setPage(value);
  };

  const { furnitures } = useAppSelector((selector) => selector.furnitures);
  const { total } = useAppSelector((state) => state.furnitures);
  const [page, setPage] = useState(1);

  return (
    <React.Fragment>
      <Grid
        container
        spacing={4}
        marginTop="1vh"
        marginLeft="10px"
        maxWidth="95vw"
        columns={{ xs: 1, sm: 4, md: 12, lg: 12 }}
      >
        {furnitures.map((f, id) => {
          return <FurnitureCard furniture={f} key={id} id={id} />;
        })}
      </Grid>
      <Pagination
        disabled={furnitures.length > 8}
        page={page}
        count={~~(total / 8) + (total % 8 !== 0 ? 1 : 0)}
        sx={{ mt: "20px", mb: "50px" }}
        color="primary"
        onChange={handleChange}
      />
    </React.Fragment>
  );
});

export default FurnitureGrid;
