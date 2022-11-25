import http from "node:http";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import { Server } from "socket.io";

import auth_router from "./router/auth-router";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/auth", auth_router);

app.get("/", (request, response) => {
  response.json("Hello, world");
});

io.on("connect", (socket) => {});

server.listen(4242, () => {
  console.log("Listening on http://localhost:4242");
});
