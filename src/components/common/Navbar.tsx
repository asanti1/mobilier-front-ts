import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { Status } from "../../store/auth/interfaces/userState";
import UserMenu from "../user/UserMenu";
import { loginButtonDisabler } from "./types/navbarTypes";

const Navbar = (): JSX.Element => {
  const { status } = useAppSelector((state) => state.auth);
  return (
    <>
      <Grid container maxWidth="xl">
        <AppBar position="sticky">
          <Toolbar>
            <Grid item xs={6}>
              <Typography
                color="primary"
                component={Link}
                to={"/"}
                variant="h6"
              >
                Mobilier
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {!loginButtonDisabler.includes(window.location.pathname) ? (
                <TextField
                  label="Search"
                  variant="filled"
                  sx={{ minWidth: "35vw" }}
                />
              ) : (
                <div></div>
              )}
            </Grid>
            <Grid item xs={2}>
              {!loginButtonDisabler.includes(window.location.pathname) &&
              !(status === Status.AUTHENTICATED) ? (
                <Link to="auth/login">
                  <Button>Login</Button>
                </Link>
              ) : status === Status.AUTHENTICATED ? (
                <UserMenu />
              ) : (
                <div></div>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </>
  );
};
export default Navbar;
