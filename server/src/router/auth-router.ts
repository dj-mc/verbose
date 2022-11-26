import express, { Request, Response } from "express";

import { auth_schema } from "verbose-common";

function validate_form(request: Request, response: Response) {
  const auth_form_data = request.body;
  auth_schema
    .validate(auth_form_data)
    .catch((error) => {
      // Handle invalid POST requests from anywhere
      // e.g. http POST localhost:4242/auth/login username="" password=""
      response.sendStatus(422);
      // Should log "Unprocessable Entity"
      console.log(error.errors);
    })
    .then((valid) => {
      if (valid) {
        response.sendStatus(200);
      }
    });
}

const auth_router = express.Router();

auth_router.post("/login", (request, response) => {
  validate_form(request, response);
});

auth_router.post("/register", (request, response) => {
  validate_form(request, response);
});

export { auth_router };
