/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db2, app } from '../config/fbConfig';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';
import PrivateChat from './PrivateChat';

/*---MATERIAL-UI---*/
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
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
import { lineHeight } from '@mui/system';

// preventDefault() needed for the re-render error

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
  borderRight: {
    maxWidth: '100%',
  },
  matchList: {
    padding: '20px',
    borderBottom: '1px solid #e7e7ec',
    hover: {
      color: '#0a58ca',
    },
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});

const theme = createTheme({
  typography: {
    body1: {
      fontFamily: 'var(--font-family-default-latin)',
      fontWeight: 500,
      fontSize: '1.25rem',
      color: 'black',
      lineHeight: '2.5',
    },
  },
});

function Chat() {
  const classes = useStyles();
  const dummy = useRef();

  // get current user uid to check for current dog
  const auth = getAuth(app);
  const user = auth.currentUser;

  /*get matches from dogs collection*/
  const [dogs, setDogs] = useState([]);

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

  /*---PULL INFO FOR MATCHED DOGS FROM STATE---*/

  const arrayOfMatchedDogInfo = [];
  if (currDog[0] && dogs[0]) {
    for (let i = 0; i < currDog[0].matches.length; i++) {
      for (let j = 0; j < dogs.length; j++) {
        if (currDog[0].matches[i] === dogs[j].name) {
          let matchedDogObj = dogs[j];
          arrayOfMatchedDogInfo.push(matchedDogObj);
        }
      }
    }
    console.log('arrayOfMatchedDogInfo:', arrayOfMatchedDogInfo);
  }

  return (
    <div>
      {currDog[0] && arrayOfMatchedDogInfo[0] ? (
        <div>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                style={{ fontFamily: 'var(--font-family-default-latin)' }}
                variant="h5"
                className="header-message"
              >
                Chat
              </Typography>
            </Grid>
          </Grid>

          <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={12} className={classes.borderRight}>
              {/* <List>
                <ListItem button key="avatar">
                  <ListItemIcon>
                    <Avatar src={currDog[0].imageUrl[0]} />
                  </ListItemIcon>
                  <ListItemText>{currDog[0].name}</ListItemText>
                </ListItem>
          </List> */}
              <Divider />

              <List>
                {arrayOfMatchedDogInfo.map((matchedDog) => (
                  <Link to="/chat/private" style={{ textDecoration: 'none' }}>
                    <ListItem
                      disableGutters={true}
                      className={classes.matchList}
                      theme={theme}
                      button
                      key="avatar"
                      onClick={PrivateChat}
                    >
                      <ListItemIcon>
                        <Avatar src={matchedDog.imageUrl[0]} />
                      </ListItemIcon>
                      <ThemeProvider theme={theme}>
                        <ListItemText>{matchedDog.name}</ListItemText>
                      </ThemeProvider>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>
          <Typography
            style={{ fontFamily: 'var(--font-family-default-latin)' }}
            variant="h5"
            className="header-message"
          >
            Chat
          </Typography>
          <Divider />
          <div>
            <Link to="/home" style={{ textDecoration: 'none' }}>
              Sorry no matches yet. Return to Home to swipe!
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
