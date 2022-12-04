import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Protected from "./Protected";
import { AuthContext } from "./UserContext";

function Views() {
  const { user } = useContext(AuthContext);
  return user.logged_in === null ? (
    <p>Loading...</p>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Views;
