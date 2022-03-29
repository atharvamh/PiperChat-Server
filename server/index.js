// module imports
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const uuid = require("uuid");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

// server setup and variables
const PORT = process.env.PORT || 3002;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// middlewares
app.use(router);
app.use(cors());

const firstLetterUpper = (text) => {
    return text?.charAt(0).toUpperCase() + text.slice(1);
}

const getMessageTime = (dt) => {
    return dt?.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}


io.engine.generateId = (req) => {
    return uuid.v4();
}

io.on('connection', (socket) => {

    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        
        if(error) return callback(error);

        socket.emit('message', {
            user: 'admin', 
            text: `${firstLetterUpper(user?.name)}, welcome to ${user?.room}`, 
            time: getMessageTime(new Date())
        });

        socket.broadcast.to(user?.room).emit('message', { 
            user: 'admin', 
            text: `${firstLetterUpper(user?.name)} has joined!`, 
            time: getMessageTime(new Date())
        });

        socket.join(user?.room);

        io.to(user?.room).emit('room-data', {room : user?.room, users: getUsersInRoom(user?.room)})

        callback(error);
    })

    socket.on('send-message', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user?.room).emit('message', {
            user: user?.name, 
            text: message, 
            time: getMessageTime(new Date())
        });
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user){
            io.to(user?.room).emit('message', {
                user: 'admin', 
                text: `${firstLetterUpper(user?.name)} has left the room`, 
                time: getMessageTime(new Date())
            })

            io.to(user?.room).emit('room-data', {room : user?.room, users: getUsersInRoom(user?.room)})
        }
    })
})

// server init
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
