import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo.png"
import { useAlert } from 'react-alert';
import "./style.sass"


const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const alert = useAlert();

    const validate = (event) => {
        if(name.trim().length === 0 || room.trim().length === 0){
            event.preventDefault();
            alert.show("Name / Room empty");
        }
    }

    return (
        <div className='container'>
            <div className='outer-container d-flex justify-content-center align-items-center vh-100'>
                <div className='inner-container'>
                    <h2 className='heading d-flex align-items-center gap-2'>
                        <img src={logo} alt='logo' width={42} height={42}/>
                        <span>Join a room</span>
                    </h2>
                    <form>
                        <div className='form-group mt-3'>
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id='name' placeholder="Enter your Name" 
                            onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="room">Room</label>
                            <input type="text" className="form-control" id='room' placeholder="Enter Room Name" 
                            onChange={(event) => setRoom(event.target.value)}/>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <Link onClick={(event) => validate(event)} to={`/chat?name=${name}&room=${room}`}
                            className='w-100'>
                                <button className='btn btn-success btn-sm mt-4 w-100' type='submit'>Join</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Join;