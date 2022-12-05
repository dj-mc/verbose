import * as Yup from "yup";

const auth_validation_schema = Yup.object({
  // Validate username input
  username: Yup.string()
    .required("Required")
    .min(3, "Must be at least 3 characters")
    .max(16, "Must be at most 16 characters")
    .matches(/[a-z]{3}[\w]*/i, "Must start with 3 alphabet characters"),
  // Validate password input
  password: Yup.string()
    .required("Required")
    .min(9, "Must be at least 9 characters")
    .max(32, "Must be at most 32 characters"),
});

const contact_validation_schema = Yup.object({
  // Validate contact's username input
  username: Yup.string()
    .required("Required")
    .min(3, "Must be at least 3 characters")
    .max(16, "Must be at most 16 characters")
    .matches(/[a-z]{3}[\w]*/i, "Must start with 3 alphabet characters"),
});

export { auth_validation_schema, contact_validation_schema };
