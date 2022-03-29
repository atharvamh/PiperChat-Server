import React, {useState, useEffect} from 'react'
import queryString from "query-string";
import io from "socket.io-client";
import "./style.sass"

let socket;

const Chat = () => {

    const [name, setname] = useState('');
    const [room, setroom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:3000'
    const url = window.location.search;

    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);

        socket = io(ENDPOINT,{ transports: [ "websocket", "polling", "flashsocket" ] });

        setname(name);
        setroom(room);

        socket.emit('join', {name, room});

        // // disconnecting the socket on component unmounting. return statement handles component unmounting
        return () => {
            socket.disconnect();
            socket.off();
        }
    },[ENDPOINT, url])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    },[messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }

        console.log(message, messages);
    }

    return (
        <div className='container'>
            <div className='outer-container d-flex justify-content-center align-items-center vh-100'>
                <div className='inner-container'>
                    <input 
                        value={message} 
                        onChange={(event) => setMessage(event.target.value)} 
                        onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
                    />
                </div>
            </div>
        </div>
    )
}

export default Chat