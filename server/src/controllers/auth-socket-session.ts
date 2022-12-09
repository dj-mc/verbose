import { Socket } from "socket.io";

import redis_client from "../../redis.js";

async function get_contacts_cache(socket: Socket) {
  // Get user's added contacts list from redis
  const contacts_cache = await redis_client.lrange(
    `contacts:${socket.user.username}`,
    0,
    -1
  );

  return contacts_cache;
}

async function parse_contacts(contacts: string[]) {
  const parsed_contacts = [];

  for (let contact of contacts) {
    // Newly added contacts are stored in redis
    // as a joined string of <username>.<contact_id>.
    const contact_data = contact.split("."); // Split to get data back
    const contact_online = await redis_client.hget(
      `contact_id:${contact_data[0]}`,
      "online"
    );

    parsed_contacts.push({
      username: contact_data[0],
      contact_id: contact_data[1],
      online: contact_online,
    });
  }

  return parsed_contacts;
}

function socket_session_interface(middleware: any) {
  console.log("socket_session_interface");
  // Make express-session data compatible with socket.io
  return (socket: Socket, next: any) => middleware(socket.request, {}, next);
}

function authorize_socket_user(socket: Socket, next: any) {
  console.log("\n\nauthorize_socket_user");
  const session = socket.request.session;

  if (session && session.user) {
    socket.user = { ...session.user };
    next();
  } else {
    console.log("Bad request");
    next(new Error("Cannot authorize"));
  }
}

async function init_socket_user(socket: Socket) {
  console.log("init_socket_user");
  const session = socket.request.session;

  socket.user = { ...session.user };
  console.log(`socket.join(${socket.user.contact_id})`);
  socket.join(socket.user.contact_id);

  // Store user's contact_id (uuid) value
  // to redis hash field.
  await redis_client.hset(
    `contact_id:${socket.user.username}`, // Redis key
    "contact_id", // Field name
    socket.user.contact_id, // Field value
    "online", // Set online field
    true // to value true
  );

  const contacts_cache = await get_contacts_cache(socket);
  const parsed_contacts = await parse_contacts(contacts_cache);
  const rooms = parsed_contacts.map((contact) => contact.contact_id);

  console.log(`${socket.user.username}'s contacts:`, parsed_contacts);
  // Send signal to <Dashboard /> to update its contacts state
  socket.emit("contacts", parsed_contacts);

  if (rooms.length > 0) {
    // Send signal to contacts that you're online
    socket.to(rooms).emit("online", true, socket.user.username);
    console.log(`Connected: contact_id:${socket.user.username}`, rooms);
  }

  // console.log("\nDEBUG SOCKET\n");
  // console.log("socket.id:", socket.id);
  // console.log("socket.user.contact_id:", socket.user.contact_id);
  // console.log(
  //   "socket.request.session.user.username:",
  //   socket.request.session.user.username
  // );
}

async function add_contact(
  socket: Socket,
  contact_name: string,
  callback: CallableFunction
) {
  console.log("\nadd_contact");
  console.log("Attempting to add contact_name:", contact_name);

  const pending_contact = await redis_client.hgetall(
    `contact_id:${contact_name}`
  );

  if (!pending_contact.contact_id) {
    callback({ done: false, error_message: `Couldn't find ${contact_name}` });
    return;
  }

  if (pending_contact.contact_id === socket.user.contact_id) {
    callback({ done: false, error_message: `Cannot add oneself` });
    return;
  }

  const contacts_cache = await get_contacts_cache(socket);

  if (contacts_cache) {
    console.log("contact_name:", contact_name);
    console.log("pending_contact.contact_id:", pending_contact.contact_id);
    console.log("contacts_cache:", contacts_cache);

    if (
      contacts_cache.includes(`${contact_name}.${pending_contact.contact_id}`)
    ) {
      callback({ done: false, error_message: `${contact_name} already added` });
      return;
    } else {
      // Join <username>.<contact_id>
      const joined_contact_data = [
        contact_name,
        pending_contact.contact_id,
      ].join(".");

      console.log("Joined data:", joined_contact_data);

      // Push new contact to
      // user's added contacts list in redis.
      await redis_client.lpush(
        `contacts:${socket.user.username}`,
        joined_contact_data
      );

      const new_contact = {
        username: contact_name,
        contact_id: pending_contact.contact_id,
        online: pending_contact.online,
      };
      callback({ done: true, new_contact });
    }
  }
}

async function disconnect_user(socket: Socket) {
  await redis_client.hset(
    `contact_id:${socket.user.username}`,
    "online", // Set online field
    false // to value false
  );

  const contacts_cache = await get_contacts_cache(socket);
  const parsed_contacts = await parse_contacts(contacts_cache);
  const rooms = parsed_contacts.map((contact) => contact.contact_id);

  // Send signal to contacts that you're offline
  socket.to(rooms).emit("online", false, socket.user.username);
  console.log(`Disconnected: contact_id:${socket.user.username}`, rooms);
}

export {
  add_contact,
  authorize_socket_user,
  disconnect_user,
  init_socket_user,
  socket_session_interface,
};
