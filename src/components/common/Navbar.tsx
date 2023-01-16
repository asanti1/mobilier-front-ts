import {
  AppBar,
  Button,
  Container,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

const Navbar = (): JSX.Element => {
  return (
    <>
      <Grid
        container
        spacing={12}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        position="static"
      >
        <AppBar color="primary" position="fixed">
          <Toolbar color="primary">
            <Grid item xs={0}>
              <Typography color="primary">Mobilier</Typography>
            </Grid>
            <Container maxWidth="sm">
              <Grid item xs={12}>
                <TextField label="Search" variant="filled" fullWidth />
              </Grid>
            </Container>
            <Grid item xs={0}>
              <Button color="secondary">Login</Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </>
  );
};

export default Navbar;
