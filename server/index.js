// module imports
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const uuid = require("uuid");
const cors = require("cors");

// server setup and variables
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// middlewares
app.use(router);
app.use(cors());


io.engine.generateId = (req) => {
    return uuid.v4();
}

io.on('connection', (socket) => {
    console.log(`New connection : ${socket.id}`);

    socket.on('join', ({name, room}) => {
        console.log(name, room);
    })

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} has left the room`);
    })
})

// server init
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
