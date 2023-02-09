import React from "react";
import Navbar from "./components/common/navbar/Navbar";
import FurnitureGrid from "./components/furnitures/FurnitureGrid";
import { useAppSelector } from "./hooks/redux/useAppSelector";
import { Status } from "./store/auth/interfaces/userState";

const App = React.memo(() => {
  const { status } = useAppSelector((state) => state.auth);

  return (
    <React.Fragment>
      <Navbar searchBarDisabled={status === Status.NOT_AUTHENTICATED} />
      <FurnitureGrid />
    </React.Fragment>
  );
});

export default App;
