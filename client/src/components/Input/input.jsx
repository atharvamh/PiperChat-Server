import React from "react";
import { FaRocket } from "react-icons/fa"
import "./input.sass";

const Input = ({message, sendMessage, setMessage}) => {
    return (
        <div className="input d-flex justify-content-between gap-1 align-items-center">
            <form className="form w-100">
                <input
                    type="text"
                    className="form-control w-100"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' ? sendMessage(event) : null}
                />
            </form>
            <button className="btn btn-primary btn-sm d-flex align-items-center gap-1" onClick={(event) => sendMessage(event)}>
                Send <FaRocket />
            </button>
        </div>
    )
}

export default Input