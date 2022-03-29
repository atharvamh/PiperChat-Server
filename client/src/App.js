import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./components/Join/join";
import Chat from "./components/Chat/chat";
import "./App.sass";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" exact element={<Join />}></Route>
                    <Route path="/chat" element={<Chat />}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App