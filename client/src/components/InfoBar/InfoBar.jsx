import React from "react";
import { FaCircle, FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import "./InfoBar.sass";

const InfoBar = ({room}) => {
    const navigate = useNavigate();
    return (
        <div className="infobar d-flex justify-content-between gap-4 align-items-center">
            <div className="left-inner gap-2 d-flex justify-content-start align-items-center">
                <FaCircle color="#36d954"/>
                <div className="title">
                    {room}
                </div>
            </div>
            <div className="right-inner d-flex justify-content-end align-items-center">
                <FaTimes color="#fff" style={{'cursor': 'pointer'}} onClick={() => navigate("/")}/>
            </div>
        </div>
    )
}

export default InfoBar