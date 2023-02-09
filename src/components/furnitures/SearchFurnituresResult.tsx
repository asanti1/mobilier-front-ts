import React from "react";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import Navbar from "../common/navbar/Navbar";
import FurnitureGrid from "./FurnitureGrid";

const SearchFurnituresResult = () => {
  const furnitures = useAppSelector((state) => state.furnitures.furnitures);

  return (
    <React.Fragment>
      <Navbar />
      <FurnitureGrid />
    </React.Fragment>
  );
};

export default SearchFurnituresResult;
