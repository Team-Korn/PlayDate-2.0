import React, { useState } from 'react';
import { db2 } from '../config/fbConfig';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SendMessage from './SendMessage';
import './Chat.css';


function Chat() {
  const messagesRef = db2.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(50);

  /*---listen to data with a hook---*/
  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    // const { uid, photoURL } = auth.currentUser // from SignIn

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFormValue(''); // empties the message container
  };

  return (
    <div className="home_container">
      <div className="users_container">
        <p>Sidebar Here</p>
      </div>
      <div className="messages_container">
        {messages &&
          messages.map((msg) => <SendMessage key={msg.id} message={msg} />)}
      </div>
      <form onSubmit={sendMessage}>
        <div className="sendMsg">
          <input
            style={{
              width: '78%',
              fontSize: '15px',
              fontWeight: '550',
              marginLeft: '5px',
              marginBottom: '-3px',
            }}
            placeholder="Message..."
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button
            style={{
              width: '18%',
              fontSize: '15px',
              fontWeight: '550',
              margin: '4px 5% -13px 5%',
              maxWidth: '200px',
            }}
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
