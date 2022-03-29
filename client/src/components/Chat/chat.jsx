import React, {useState, useEffect} from 'react'
import queryString from "query-string";
import io from "socket.io-client";
import "./style.sass"

let socket;

const Chat = () => {

    const [name, setname] = useState('');
    const [room, setroom] = useState('');
    const ENDPOINT = 'localhost:3000'
    const url = window.location.search;

    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);

        socket = io(ENDPOINT,{ transports: [ "websocket", "polling", "flashsocket" ] });

        setname(name);
        setroom(room);

        socket.emit('join', {name, room});

        // disconnecting the socket on component unmounting. return statement handles component unmounting
        return () => {
            socket.emit('disconnect')
            socket.off();
        }
    },[ENDPOINT, url])

    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat