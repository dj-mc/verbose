import { io } from "socket.io-client";

const socket = new io("http://localhost:4242", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
