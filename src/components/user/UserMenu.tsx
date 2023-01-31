import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { Role } from "../../interfaces/role";
import { clearUser } from "../../store/auth/authSlice";

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const { firstName, roles } = useAppSelector((state) => state.auth.user);
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    handleCloseMenu();
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpenMenu}>Welcome, {firstName}</Button>
      <Menu anchorEl={anchor} open={open} onClose={handleCloseMenu}>
        <MenuItem onClick={handleCloseMenu} component={Link} to={"profile"}>
          <Person2RoundedIcon />
          Profile
        </MenuItem>
        {roles?.includes(Role.ADMIN) ? (
          <MenuItem
            onClick={handleCloseMenu}
            component={Link}
            to={"administration"}
          >
            <AdminPanelSettingsRoundedIcon />
            Administration
          </MenuItem>
        ) : (
          <div></div>
        )}

        <MenuItem onClick={handleLogout}>
          <LogoutRoundedIcon />
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default UserMenu;
