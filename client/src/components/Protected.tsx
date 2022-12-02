import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "./UserContext";

function authorize_user() {
  const { user } = useContext(AuthContext);
  return user && user.logged_in;
}

function Protected() {
  const is_user_logged_in = authorize_user();
  return is_user_logged_in ? <Outlet /> : <Navigate to={"/"} />;
}

export default Protected;
