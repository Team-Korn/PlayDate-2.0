/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useEffect } from 'react';
import { db2, app } from '../config/fbConfig';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';
import './PrivateChat.css';

/*---MATERIAL-UI---*/
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh',
    },
    headBG: {
        backgroundColor: '#e0e0e0',
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0',
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto',
    },
});


function PrivateChat() {
    const classes = useStyles();
    const dummy = useRef();

    // get current user uid to check for current dog
    const auth = getAuth(app);
    const user = auth.currentUser;

    /*---CHAT-MESSAGES---*/

    const messagesRef = db2.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(50);
    /*---listen to data with a hook---*/
    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();


        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            sentBy: user.uid
        });
        setFormValue(''); // empties the message container
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>

            {/*---MESSAGE CONTAINER---*/}
            <Grid max-width="100%" >
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right">
                                    {messages &&
                                        messages.map((msg) => (
                                            <SendMessage key={msg.id} message={msg} />
                                        ))}
                                    <span ref={dummy}></span>
                                </ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container style={{ padding: '20px' }}>
                    <Grid item xs={11}>
                        <form onSubmit={sendMessage}>
                            <TextField
                                id="outlined-basic-email"
                                label="say something nice"
                                fullWidth
                                value={formValue}
                                onChange={(e) => setFormValue(e.target.value)}
                            />
                        </form>
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab onClick={sendMessage} color="primary" aria-label="add">
                            <SendIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    )
}

function SendMessage(props) {
    const { text, sentBy } = props.message;

    /*---Distinguish messages sent by current dog vs recieved by matched dog---*/
    const [dogs, setDogs] = useState([]);
    // gets dog collection
    useEffect(() => {
        (async () => {
            try {
                const querySnapshot = await getDocs(collection(db2, 'dogs'));
                const dogData = [];
                querySnapshot.forEach((doc) => {
                    dogData.push(doc.data());
                });

                setDogs(dogData);
            } catch (err) {
                console.log(err, 'who let the dogs out?');
            }
        })();
    }, []);
    console.log('dogs:', dogs);

    // get current user uid to check for current dog
    const auth = getAuth(app);
    const user = auth.currentUser;

    // shows owner's dog
    const currDog = dogs.filter((dog) => {
        return dog.ownerId === user.uid;
        // returns array with single object of current dog
    });
    console.log('currDog:', currDog);


    const messageClass = sentBy === user.uid ? 'sent' : 'received'

    return (
        <div className={`message ${messageClass}`}>
            {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}
            <p>{text}</p>
        </div>
    );
}

export default PrivateChat;