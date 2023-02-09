import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux/useAppDispatch";
import { useAppSelector } from "../../../hooks/redux/useAppSelector";
import { Status } from "../../../store/auth/interfaces/userState";
import { getFurnitures } from "../../../store/furnitures/thunks";
import UserMenu from "../../user/UserMenu";
import ShoppingCart from "../shoppingCart/ShoppingCart";
import NavbarLoginButton from "./NavbarLoginButton";
import NavbarSearchBar from "./NavbarSearchBar";

export interface NavbarProps {
  shoppingCartDisabled?: boolean;
  loginButtonDisabled?: boolean;
  searchBarDisabled?: boolean;
}

const Navbar = (props: NavbarProps): JSX.Element => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
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
                onClick={() => dispatch(getFurnitures(1))}
              >
                Mobilier
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {!props.searchBarDisabled ? (
                <div>
                  <NavbarSearchBar />
                  {status === Status.AUTHENTICATED &&
                  !props.shoppingCartDisabled ? (
                    <ShoppingCart />
                  ) : null}
                </div>
              ) : (
                <div></div>
              )}
            </Grid>
            <Grid item xs={2}>
              {!props.loginButtonDisabled &&
              !(status === Status.AUTHENTICATED) ? (
                <NavbarLoginButton />
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
