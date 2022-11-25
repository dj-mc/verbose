import express from "express";

import { auth_schema } from "verbose-common";

const auth_router = express.Router();
auth_router.post("/login", (request, response) => {
  const auth_data = request.body;
  auth_schema.validate(auth_data).catch((error) => {
    console.log(error.errors);
  });
});

export { auth_router };
