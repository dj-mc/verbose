import { io, Socket } from "socket.io-client";

const socket: Socket = io(
  "http://localhost:4242",
  {
    autoConnect: false,
    withCredentials: true,
  }
);

export default socket;
