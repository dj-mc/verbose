import * as Yup from "yup";
import express from "express";

export const auth_schema = Yup.object({
  // Validate username input
  username: Yup.string()
    .required("Required")
    .min(3, "Need at least 3 characters")
    .max(16, "Need at most 16 characters"),
  // Validate password input
  password: Yup.string()
    .required("Required")
    .min(9, "Need at least 9 characters")
    .max(32, "Need at most 32 characters"),
});

const auth_router = express.Router();
auth_router.post("/login", (request, response) => {
  const auth_data = request.body;
  auth_schema.validate(auth_data).catch((error) => {
    console.log(error.errors);
  });
});

export default auth_router;
