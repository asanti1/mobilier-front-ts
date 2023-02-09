import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { countries } from "../../../auth/register/types";

const AddressUserProfileForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <React.Fragment>
      <Grid container sx={{ marginLeft: "10px" }}>
        <Grid item mt={3} xs={10}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth {...field}>
                <InputLabel {...field} variant="standard">
                  Country
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    ...field,
                  }}
                >
                  {countries.map((c, idx) => {
                    return (
                      <option key={idx} value={`${c}`}>
                        {c}
                      </option>
                    );
                  })}
                </NativeSelect>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField label="State" variant="standard" {...field} />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField label="City" variant="standard" {...field} />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="street"
            control={control}
            render={({ field }) => (
              <TextField label="Street" variant="standard" {...field} />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="roomNumber"
            control={control}
            render={({ field }) => (
              <TextField label="Room number" variant="standard" {...field} />
            )}
          />
        </Grid>
        <Grid>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                type="password"
                label="Your password to apply changes"
                variant="standard"
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddressUserProfileForm;
