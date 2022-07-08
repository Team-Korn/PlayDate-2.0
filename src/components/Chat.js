import React from "react";
import '../styles/styles.css';
import './Chat.css';
import ChatNavbar from "./ChatNavbar";
import MessageForm from "./MessageForm";

const Chat = () => {
    return (
        <>
            <ChatNavbar />
            <div className="home_container">
                <div className="users_container">
                    <h2> Put ChatSidebar here!</h2>
                </div>
                <div className="messages_container">
                    <div>
                        <MessageForm />
                        <form className="message_form">
                            <input type="text" placeholder="Enter message" />

                            <div>
                                <button className="btn">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Chat