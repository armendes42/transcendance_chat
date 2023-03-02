const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const users = {};

app.use(express.static("public"));

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/users", (_, res) => {
    res.send(Object.values(users));
});

io.on("connection", socket => {
    console.log("connected", socket.id);
    socket.on("user-connected", user => {
        users[socket.id] = {...user, id: socket.id};
        console.log("user-connected", users);
        socket.broadcast.emit("user-changed", Object.values(users));
    });

    socket.on("disconnect", () => {
        delete users[socket.id];
    });
});

server.listen(3000, () => {
    console.log("listening on 3000");
});