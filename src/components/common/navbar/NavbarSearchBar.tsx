import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import React, { useState } from "react";
import { useAppDispatch } from "../../../hooks/redux/useAppDispatch";
import {
  getFurnitures,
  getFurnituresByName,
} from "../../../store/furnitures/thunks";

const NavbarSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLDivElement | HTMLFormElement>,
    searchTerm: string
  ) => {
    e.preventDefault();
    if (searchTerm === "") {
      dispatch(getFurnitures(1));
    } else {
      dispatch(getFurnituresByName(searchTerm));
    }
  };

  return (
    <React.Fragment>
      <FormControl
        component="form"
        onSubmit={(e) => handleSubmit(e, searchTerm)}
      >
        <TextField
          type="text"
          onSubmit={(e) => handleSubmit(e, searchTerm)}
          onChange={(e) => handleChange(e)}
          value={searchTerm}
          label="Search"
        >
          Search
        </TextField>
      </FormControl>
    </React.Fragment>
  );
};

export default NavbarSearchBar;
