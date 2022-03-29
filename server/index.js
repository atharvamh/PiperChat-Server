// module imports
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const uuid = require("uuid");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

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

    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser( { id: socket.id, name, room } );

        //if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user?.name}, welcome to the room ${user?.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined`});
        socket.join(user.room);

        //callback();
    })

    socket.on('sendMesage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});

        callback();
    })

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} has left the room`);
    })
})

// server init
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
