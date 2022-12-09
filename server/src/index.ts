import http from "http";

import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import connectRedis from "connect-redis";
import { Server, Socket } from "socket.io";

// This project is fullstack typescript outputting esnext,
// so we must append .js to local imports to support esm in nodejs.
import auth_router from "./routers/auth-router.js";
import {
  add_contact,
  authorize_socket_user,
  disconnect_user,
  init_socket_user,
  socket_session_interface,
} from "./controllers/auth-socket-session.js";
import redis_client from "../redis.js";
// I could've had the verbose-common code output to cjs, but
// the client's scaffold (vite -> esnext) was not playing along.

const app = express();
const server = http.createServer(app);

const cors_options = {
  // Let the client and server share resources
  origin: "http://localhost:5173",
  // Including cookies for credentials
  credentials: true,
};

const io = new Server(server, {
  cors: cors_options,
});

const RedisStore = connectRedis(session);

/*

Middleware

*/

declare module "http" {
  interface IncomingMessage {
    session: {
      user: {
        username: string;
        id: number;
        contact_id: string;
      };
    };
  }
}

declare module "socket.io" {
  interface Socket {
    user: {
      username: string;
      id: number;
      contact_id: string;
    };
  }
}

const session_middleware = session({
  name: "sid", // Session ID
  resave: false, // True is deprecated
  saveUninitialized: false, // True is deprecated
  secret: `${process.env.SESSION_SECRET}`, // Sign cookie
  store: new RedisStore({ client: redis_client }),
  // Login `SessionData` cookie info
  cookie: {
    httpOnly: true, // Disallow client to see document.cookie
    maxAge: 3600 * 1000 * 24, // 24-hour cookie lifetime
    sameSite: process.env.PRODUCTION === "true" ? "none" : "lax",
    secure: process.env.PRODUCTION === "true" ? true : "auto",
  },
});

app.use(helmet()); // Setup basic security headers
app.use(cors(cors_options));
app.use(express.json()); // Parse application/json in req.body
app.use(session_middleware);
app.use("/auth", auth_router); // Route requests to /auth

io.use(socket_session_interface(session_middleware));
io.use(authorize_socket_user);

/*

 Server endpoints

 */

app.get("/", (_, response) => {
  response.json("Hello, world");
});

io.on("connect", (socket: Socket) => {
  init_socket_user(socket);
  // Listen for add_contact event trigger
  // from AddContact's onSubmit calling socket.emit("add_contact").
  socket.on("add_contact", (contact_name, callback) => {
    add_contact(socket, contact_name, callback);
  });

  socket.on("disconnecting", () => disconnect_user(socket));
});

server.listen(4242, () => {
  console.log("Listening on http://localhost:4242");
});
