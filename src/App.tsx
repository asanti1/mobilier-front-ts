import React from "react";
import Navbar from "./components/common/Navbar";
import FurnitureGrid from "./components/furnitures/FurnitureGrid";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <FurnitureGrid />
    </React.Fragment>
  );
};

export default App;
