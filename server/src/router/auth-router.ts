import express from "express";

import {
  is_logged_in_handler,
  pending_login_handler,
  pending_register_handler,
  validate_form_handler,
} from "../controller/auth-controller.js";

const AuthRouter = express.Router();

AuthRouter.route("/login")
  .get(is_logged_in_handler)
  .post(validate_form_handler, pending_login_handler);

AuthRouter.post("/register", validate_form_handler, pending_register_handler);

export default AuthRouter;
