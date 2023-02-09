import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import AddressItem from "./AddressItem";
import { FormType } from "./types";
import { TabPanelProps } from "./UserProfile";

const ProfileAddressesInformation = (props: TabPanelProps) => {
  const { address } = useAppSelector((state) => state.auth.user);
  const { value, index } = props;
  const length = address?.length;
  return (
    <React.Fragment>
      {value === index && (
        <div>
          <Typography mt={4} variant="h5">
            You can have up to 4 addresses
          </Typography>
          <Grid
            justifyContent="center"
            container
            maxWidth="105vw"
            columns={{ xs: 1, sm: 4, md: 12, lg: 12, xl: 12 }}
          >
            {address?.length === 0 ? (
              <div></div>
            ) : (
              address?.map((add, idx) => {
                return (
                  <AddressItem
                    type={FormType.NORMAL}
                    key={idx}
                    title={`Address ${idx + 1}`}
                    address={{
                      addressId: add.addressId,
                      country: add.country || "",
                      state: add.state || "",
                      city: add.city || "",
                      street: add.street || "",
                      roomNumber: add.roomNumber || "",
                    }}
                    id={idx}
                  />
                );
              })
            )}
          </Grid>
          <Divider
            style={{ width: "100%", marginTop: "30px", marginBottom: "10px" }}
          />
          {length! < 4 ? (
            <Grid
              container
              maxWidth="105vw"
              justifyContent="center"
              columns={{ xs: 1, sm: 4, md: 12, lg: 12, xl: 12 }}
            >
              <AddressItem
                type={FormType.ADD}
                title="Add an address"
                address={{
                  country: "",
                  state: "",
                  city: "",
                  street: "",
                  roomNumber: "",
                }}
                key={5}
              />
            </Grid>
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
};

export default ProfileAddressesInformation;
