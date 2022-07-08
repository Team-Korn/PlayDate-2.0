import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, query } from 'firebase/firestore';
import { provider, auth, app, store } from '../config/fbConfig';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const MessageForm = () => {
    const [messages, setMessages] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        async function getMessages() {
            try {
                const querySnapshot = await getDocs(collection(db, 'messages'));

                console.log('QS: ', querySnapshot.docs);
                const msg = [];
                querySnapshot.forEach((doc) => {
                    msg.push(doc.data());
                });
                console.log('messages: ', msg);
                setMessages(msg);
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    }, []);
    console.log('messages', messages);
    if (!messages[0]) return null;
    return <h3>{messages.text}</h3>
};

export default MessageForm