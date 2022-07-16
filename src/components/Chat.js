/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useEffect } from 'react';
import { db2, app } from '../config/fbConfig';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';
import './Chat.css';

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

function Chat() {
  const classes = useStyles();
  const dummy = useRef();

  // get current user uid to check for current dog
  const auth = getAuth(app);
  const user = auth.currentUser;

  /*---CHAT-SIDEBAR---*/
  /*get matches from dogs collection*/
  const [dogs, setDogs] = useState([]);
  // const [currentDog, setCurrentDog] = useState([]);

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

  // shows owner's dog
  const currDog = dogs.filter((dog) => {
    return dog.ownerId === user.uid;
    // returns array with single object of current dog
  });
  console.log('currDog:', currDog);
  // setCurrentDog(currDog);
  // console.log('WHAT IS currentDog', currentDog);

  /*---PULL INFO FOR MATCHED DOGS DB---*/

  // if (currDog[0]) {
  //   const grabMatches = () => {
  //     for (let i = 0; i <= currDog[0].matches.length; i++) {
  //       const dogRef = db2.collection("dogs");
  //       return query(dogRef.where("name", "==", currDog[0].matches[i]).get())
  //       // console.log("query:", query)
  //     }
  //   }
  //   console.log(grabMatches());
  // }

  /*---PULL INFO FOR MATCHED DOGS FROM STATE---*/

  const arrayOfMatchedDogInfo = [];
  if (currDog[0] && dogs[0]) {
    for (let i = 0; i < currDog[0].matches.length; i++) {
      for (let j = 0; j < dogs.length; j++) {
        // console.log('inside for[j] loop:', dogs[j].name)
        // console.log('currDog[0].matches:', currDog[0].matches[i])
        if (currDog[0].matches[i] === dogs[j].name) {
          let matchedDogObj = dogs[j];
          arrayOfMatchedDogInfo.push(matchedDogObj);
        }
      }
    }
    console.log('arrayOfMatchedDogInfo:', arrayOfMatchedDogInfo);
  }

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
    });
    setFormValue(''); // empties the message container
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (currDog[0] && arrayOfMatchedDogInfo[0]) {
    return (
      <div>
        {/*---SIDEBAR CONTAINER---*/}
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" className="header-message">
              Chat
            </Typography>
          </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <List>
              <ListItem button key="avatar">
                <ListItemIcon>
                  <Avatar src={currDog[0].imageUrl[0]} />
                </ListItemIcon>
                <ListItemText>{currDog[0].name}</ListItemText>
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }}>
              {/*
              -------- search bar unnecessary ------------

              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              /> */}
            </Grid>
            <Divider />
            <List>
              {arrayOfMatchedDogInfo.map((matchedDog) => (
                <ListItem button key="avatar">
                  <ListItemIcon>
                    <Avatar src={matchedDog.imageUrl[0]} />
                  </ListItemIcon>
                  <ListItemText>{matchedDog.name}</ListItemText>
                </ListItem>
              ))}

              {/*
              -------- working by some static just for first object -----
              <ListItem button key="avatar">
                <ListItemIcon>
                  <Avatar src={arrayOfMatchedDogInfo[0].imageUrl[0]} />
                </ListItemIcon>
              </ListItem> */}
              {/* <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar alt="Alice" src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png" />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
            </ListItem> */}
            </List>
          </Grid>
          {/*---MESSAGE CONTAINER---*/}
          <Grid item xs={9}>
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
        </Grid>
      </div>
    );
  }
}

function SendMessage(props) {
  const { text } = props.message;

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}

// function SelectMatch(props) {

//   return (
//     <div>
//       <p></p>
//     </div>
//   )
// }

export default Chat;
