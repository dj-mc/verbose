import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import db_pool from "../../db.js";
import { auth_validation_schema } from "verbose-common";

function validate_form(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth_form_data = request.body;
  auth_validation_schema
    .validate(auth_form_data)
    .catch((error) => {
      // Handle invalid POST requests from anywhere
      // e.g. http POST localhost:4242/auth/login username="" password=""
      response.sendStatus(422);
      // Should log "Unprocessable Entity"
      console.error(error.errors);
    })
    .then((valid) => {
      if (valid) {
        console.log("Valid form input");
        next();
      } else {
        response.sendStatus(422);
      }
    });
}

// Types for login session cookie
declare module "express-session" {
  interface SessionData {
    user: {
      username: string;
      id: number;
      contact_id: string;
    };
  }
}

function is_logged_in(request: Request, response: Response) {
  // Check if a user is already logged in
  if (request.session.user && request.session.user.username) {
    response.json({
      logged_in: true,
      username: request.session.user.username,
    });
  } else {
    response.json({ logged_in: false }); // Not logged in
  }
}

async function pending_login(request: Request, response: Response) {
  const { username, password } = request.body;

  // Query for a potentially registered user
  const pending_login = await db_pool.query(
    "SELECT id, username, password_hash, contact_id FROM users u WHERE u.username=$1",
    [username]
  );

  let compared_password;
  if (pending_login.rowCount > 0) {
    // Database returned something from query
    compared_password = await bcrypt.compare(
      password,
      pending_login.rows[0].password_hash
    );

    if (compared_password) {
      // Found password from hash
      // Set login session cookie
      request.session.user = {
        username: pending_login.rows[0].username,
        id: pending_login.rows[0].id,
        contact_id: pending_login.rows[0].contact_id,
      };

      response.json({ logged_in: true, username });
    } else {
      response.json({ logged_in: false, status: "Incorrect authorization" });
    }
  } else {
    response.json({ logged_in: false, status: "Incorrect authorization" });
  }
}

async function pending_register(request: Request, response: Response) {
  const { username, password } = request.body;

  // Check if username already exists
  const user_exists = await db_pool.query(
    "SELECT username FROM users WHERE username=$1",
    [username]
  );

  if (user_exists.rowCount === 0) {
    // No username found, proceed with registration
    // Salt password (10 times) to safeguard rainbow table attacks
    const password_hash = await bcrypt.hash(password, 10);
    const contact_id = uuidv4();

    const new_registered_user = await db_pool.query(
      // Insert new registered user into database
      "INSERT INTO users(username, password_hash, contact_id) values($1, $2, $3) RETURNING id, username, contact_id",
      [username, password_hash, contact_id]
    );

    // Set login session cookie
    request.session.user = {
      username: new_registered_user.rows[0].username,
      id: new_registered_user.rows[0].id,
      contact_id: new_registered_user.rows[0].contact_id,
    };

    response.json({ logged_in: true, username });
  } else {
    response.json({ logged_in: false, status: "User already exists" });
  }
}

export { is_logged_in, pending_login, pending_register, validate_form };
