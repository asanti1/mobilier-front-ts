import { AppBar, Box, Divider, Tab, Tabs } from "@mui/material";
import React from "react";
import AddFurniture from "./AddFurniture";
import UsersTable from "./UsersTable";

const AdministrationBar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Divider style={{ width: "100%" }} />
      <Box>
        <AppBar position="relative">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Users" />
            <Tab label="Add Furniture" />
          </Tabs>
        </AppBar>
        <UsersTable value={value} index={0} />
        <AddFurniture value={value} index={1} />
      </Box>
    </React.Fragment>
  );
};

export default AdministrationBar;
