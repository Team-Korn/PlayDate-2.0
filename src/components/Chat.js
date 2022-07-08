import React, { useState, useRef } from 'react'
import { db } from '../config/fbConfig'
import firebase from 'firebase/compat/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import SendMessage from './SendMessage'

function Chat() {
    const messagesRef = db.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(50);

    /*---listen to data with a hook---*/
    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault()
        // const { uid, photoURL } = auth.currentUser // from SignIn

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setFormValue('') // empties the message container
    }

    return (
        <>
            <div>
                {messages && messages.map(msg => <SendMessage key={msg.id} message={msg} />)}
            </div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                    <button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px' }} type="submit">Send</button>
                </div>
            </form>
        </>

    )
}

export default Chat