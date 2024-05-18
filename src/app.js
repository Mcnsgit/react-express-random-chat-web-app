import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home.js";
import "antd";
import VideoChat from "./components/video/videoChat.js";
import "font-awesome/css/font-awesome.min.css";

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Home /> } />
            <Route path="/video" element={VideoChat} />
            <Route path="*" element={<Home />} />
            </Routes>
        </Router>        
    );
}

export default App