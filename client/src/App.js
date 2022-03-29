import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./components/Join/join";
import Chat from "./components/Chat/chat";
import { Provider, positions } from "react-alert"; 
import AlertTemplate from "react-alert-template-basic";
import "./App.sass";

const options = {
    timeout: 1500,
    position: positions.TOP_CENTER,
    offset: '1em',
    containerStyle : {
        fontSize : '0.8em',
    }
};

const App = () => {
    return (
        <div className="App">
            <Provider template={AlertTemplate} {...options}>
                <Router>
                    <Routes>
                        <Route path="/" exact element={<Join />}></Route>
                        <Route path="/chat" element={<Chat />}></Route>
                    </Routes>
                </Router>
            </Provider>
        </div>
    )
}

export default App