import { Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import Administration from "../components/user/Administration";
import UserProfile from "../components/user/UserProfile";
import { useAppSelector } from "../hooks/redux/useAppSelector";
import { Role } from "../interfaces/role";
import { Status } from "../store/auth/interfaces/userState";

export const Router = () => {
  const { status } = useAppSelector((selector) => selector.auth);
  return (
    <>
      {status === Status.AUTHENTICATED ? (
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
      )}
    </>
  );
};
