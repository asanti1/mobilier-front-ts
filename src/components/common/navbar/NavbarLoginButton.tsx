import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NavbarLoginButton = () => {
  return (
    <React.Fragment>
      <Link to="auth/login">
        <Button>Login</Button>
      </Link>
    </React.Fragment>
  );
};

export default NavbarLoginButton;
