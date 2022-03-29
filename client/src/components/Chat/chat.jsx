import React, {useState, useEffect} from 'react'
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/input';
import Messages from '../Messages/messages';
import ScrollToBottom from "react-scroll-to-bottom";
import "./style.sass"
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCircle } from "react-icons/fa"

let socket;

const Chat = () => {

    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [room, setroom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [usersInRoom, setUsersInRoom] = useState([]);
    const ENDPOINT = 'localhost:3002'
    const url = window.location.search;

    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);

        socket = io(ENDPOINT,{ transports: [ "websocket", "polling", "flashsocket" ] });

        setname(name);
        setroom(room);

        socket.emit('join', {name, room}, (err) => {
            if(err){
                toast.error(`Error : ${err} !`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose : 2000,
                    className: 'custom-toast',
                    closeOnClick : true,
                    pauseOnHover : true
                });
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            }
        });

        // disconnecting the socket on component unmounting. return statement handles component unmounting
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

    useEffect(() => {
        socket.on('room-data', (roomdata) => {
            const tempUsers = roomdata?.users?.map(x => x?.name);
            setUsersInRoom(tempUsers);
        })
    },[usersInRoom])

    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('send-message', message, () => setMessage(''));
        }
    }

    const firstLetterUpper = (text) => {
        return text?.charAt(0).toUpperCase() + text.slice(1);
    }

    return (
        <div className='container'>
            <ToastContainer />
            <div className='outer-container d-flex gap-2 justify-content-center align-items-center vh-100'>
                <div className='chat-inner-container'>
                    <InfoBar room={room}/>
                    <Messages messages={messages} name={name}/>
                    <Input message={message} sendMessage={sendMessage} setMessage={setMessage}></Input>
                </div>
                <div className='users-container'>
                    <div className='infobar-ol d-flex justify-content-between align-items-center'>
                        <div className='d-flex justify-content-start align-items-center gap-2'>
                            <div className="title-ol">
                                Users Online
                            </div>
                        </div>
                    </div>
                    <ScrollToBottom className='usr-cont'>
                        <div className='user-list mt-1'>
                            {
                                usersInRoom.map((name, idx) =>
                                    <h6 key={idx} className="d-flex gap-1 align-items-center"> 
                                        <FaCircle color="#36d954"/> 
                                        {firstLetterUpper(name)}
                                    </h6>
                                ) 
                            }
                        </div>
                    </ScrollToBottom>
                </div>
            </div>
        </div>
    )
}

export default Chat