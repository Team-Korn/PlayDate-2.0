import React, { useState, useEffect, useRef } from 'react'
import { db } from '../config/fbConfig'
import SendMessage from './SendMessage'

function Chat() {
    // const scroll = useRef()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return (
        <>
            <h1>{messages.text}</h1>
            <div>
                <SendMessage />
            </div>
        </>


        // <div>
        //     <div className="msgs">
        //         {messages.map((id, text) => (
        //             <div key={id}>
        //                 {/* <img src={photoURL} alt="" /> */}
        //                 <p>{text}</p>
        //             </div>
        //         ))}
        //     </div>
        //     <SendMessage scroll={scroll} />
        //     <div ref={scroll}></div>
        // </div>
    )
}

export default Chat