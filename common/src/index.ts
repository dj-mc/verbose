import * as Yup from "yup";

const auth_schema = Yup.object({
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

export { auth_schema };
