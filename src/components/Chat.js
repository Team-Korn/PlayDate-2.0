import React, { useState } from 'react';
import { db2 } from '../config/fbConfig';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SendMessage from './SendMessage';
// import './Chat.css';

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
    height: '80vh'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});


function Chat() {
  const classes = useStyles();

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
    <div>
      {/*---SIDEBAR CONTAINER---*/}
      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h5" className="header-message">Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="avatar">
              <ListItemIcon>
                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/3.jpg" />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker"></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
          </Grid>
          <Divider />
          <List>
            <ListItem button key="avatar">
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png" />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>
            <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar alt="Alice" src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png" />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
            </ListItem>
          </List>
        </Grid>
        {/*---MESSAGE CONTAINER---*/}
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="right" >
                    {messages && messages.map((msg) => <SendMessage key={msg.id} message={msg} />)}
                  </ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="say something nice" fullWidth
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)} />
            </Grid>
            <Grid xs={1} align="right">
              <Fab onClick={sendMessage} color="primary" aria-label="add"><SendIcon /></Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Chat;
