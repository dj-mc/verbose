import { Route, Routes } from "react-router-dom";

import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import NotFound from "./NotFound";

function Views() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Views;
