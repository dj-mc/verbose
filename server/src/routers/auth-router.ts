import express from "express";

import {
  is_logged_in,
  pending_login,
  pending_register,
  validate_form,
} from "../controllers/auth-controller.js";
import limit_requests from "../controllers/limit-requests.js";

const auth_router = express.Router();

auth_router
  .route("/login")
  .get(is_logged_in)
  .post(validate_form, limit_requests(120, 5), pending_login);

auth_router.post(
  "/register",
  validate_form,
  limit_requests(60, 3),
  pending_register
);

export default auth_router;
