import React from "react";
import { Link } from "react-router-dom"

const ChatNavbar = () => {
    return (
        <nav className="nav-body" >
            <h3>
                <Link to="/chat">Messenger</Link>
            </h3>
            <div>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>

            </div>
        </nav>
    );
}

export default ChatNavbar