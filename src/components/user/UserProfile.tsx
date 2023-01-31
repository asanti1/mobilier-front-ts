import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import Navbar from "../common/Navbar";
import ProfileAddressesInformation from "./ProfileAddressesInformation";
import ProfileMainInformation from "./ProfileMainInformation";
import ProfilePasswordChange from "./ProfilePasswordChange";

export interface TabPanelProps {
  index: number;
  value: number;
}

const UserProfile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Navbar />
      <Divider style={{ width: "100%" }} />
      <Box>
        <AppBar position="relative">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Profile" />
            <Tab label="Address" />
            <Tab label="Change Your Password" />
          </Tabs>
        </AppBar>
        <ProfileMainInformation value={value} index={0} />
        <ProfileAddressesInformation value={value} index={1} />
        <ProfilePasswordChange value={value} index={2} />
      </Box>
    </React.Fragment>
  );
};

export default UserProfile;
