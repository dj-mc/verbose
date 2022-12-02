import { Route, Routes } from "react-router-dom";

import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import NotFound from "./NotFound";
import Protected from "./Protected";

function Views() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<Protected />}>
          <Route path="/dashboard" element={<p>Dashboard</p>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Views;
