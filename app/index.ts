// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const {Server} = require('socket.io');
// const io = new Server(server);
// const users = {};

// app.use(express.static("/usr/src/app"));

// app.get("/", (_, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// app.get("/users", (_, res) => {
//     res.send(Object.values(users));
// });

// io.on("connection", (socket) => {
//     socket.on("user-connected", (user) => {
//       users[socket.id] = { ...user, id: socket.id };
//       socket.broadcast.emit("users-changed", Object.values(users));
//       console.log("user-connected", users);
//     });
//     socket.on("new-chat-message", (message) => {
//       console.log("new-chat-message", message);
//       socket.to(message.recipientId).emit("new-chat-message", {
//         text: message.text,
//         senderId: socket.id,
//       });
//     });
//     socket.on("disconnect", () => {
//       delete users[socket.id];
  
//       socket.broadcast.emit("users-changed", Object.values(users));
//       console.log("users-changed", users);
//     });
//   });

// server.listen(5000, () => {
//     console.log("listening on 5000");
// });

import express, { Express } from "express";
import http, { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

const app: Express = express();
const server: Server = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server);
const users: { [key: string]: any } = {};

app.use(express.static("/usr/src/app"));

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/users", (_, res) => {
  res.send(Object.values(users));
});

io.on("connection", (socket: Socket) => {
  socket.on("user-connected", (user: any) => {
    users[socket.id] = { ...user, id: socket.id };
    socket.broadcast.emit("users-changed", Object.values(users));
    console.log("user-connected", users);
  });
  socket.on("new-chat-message", (message: any) => {
    console.log("new-chat-message", message);
    socket.to(message.recipientId).emit("new-chat-message", {
      text: message.text,
      senderId: socket.id,
    });
  });
  socket.on("disconnect", () => {
    delete users[socket.id];

    socket.broadcast.emit("users-changed", Object.values(users));
    console.log("users-changed", users);
  });
});

server.listen(5000, () => {
  console.log("listening on 5000");
});
