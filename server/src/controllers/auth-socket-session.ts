import { Socket } from "socket.io";

import redis_client from "../../redis.js";

function socket_session_interface(middleware: any) {
  console.log("socket_session_interface");
  // Make express-session data compatible with socket.io
  return (socket: Socket, next: any) => middleware(socket.request, {}, next);
}

function authorize_socket_user(socket: Socket, next: any) {
  console.log("authorize_socket_user");
  const session = socket.request.session;

  if (session && session.user) {
    socket.user = { ...session.user };
    next();
  } else {
    console.log("Bad request");
    next(new Error("Cannot authorize"));
  }
}

function init_socket_user(socket: Socket) {
  console.log("init_socket_user");
  const session = socket.request.session;
  socket.user = { ...session.user };

  // Store user's contact_id (uuid) value
  // to redis hash field.
  redis_client.hset(
    `contact_id:${socket.user.username}`, // Redis key
    "contact_id", // Field name
    socket.user.contact_id // Field value
  );

  console.log("socket.id:", socket.id);
  console.log("socket.user.contact_id:", socket.user.contact_id);
  console.log(
    "socket.request.session.user.username:",
    socket.request.session.user.username
  );
}

function add_contact(contact_name: string, callback: CallableFunction) {
  console.log("add_contact");
  console.log("contact_name:", contact_name);
  callback({ done: false, error_message: "Something went wrong..." });
}

export {
  socket_session_interface,
  authorize_socket_user,
  init_socket_user,
  add_contact,
};
