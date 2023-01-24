import {
  AppBar,
  Button,
  Container,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const loginButtonDisabler = ["/auth/register", "/auth/login"];

const Navbar = (): JSX.Element => {
  return (
    <Grid
      container
      spacing={12}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      position="absolute"
    >
      <AppBar color="primary" position="fixed">
        <Toolbar color="primary">
          <Grid item xs={0}>
            <Link to={"/"}>
              <Typography color="primary">Mobilier</Typography>
            </Link>
          </Grid>
          <Container maxWidth="sm">
            <Grid item xs={12}>
              {!loginButtonDisabler.includes(window.location.pathname) ? (
                <TextField label="Search" variant="filled" fullWidth />
              ) : (
                <div></div>
              )}
            </Grid>
          </Container>
          <Grid item xs={0}>
            {!loginButtonDisabler.includes(window.location.pathname) ? (
              <Link to="auth/login">
                <Button>Login</Button>
              </Link>
            ) : (
              <div></div>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Navbar;
