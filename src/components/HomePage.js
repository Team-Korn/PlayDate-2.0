// ------- FOR KATIE -------------------
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { db, app } from '../config/fbConfig';
import TinderCard from 'react-tinder-card';
import './SwipeCard.css';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import './SwipeButtons.css';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import EndOfDeck from './EndOfDeck';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const addClassToNavbar = () => {
  // in order to achieve the sticky actions button, we need to set the dog compoent to be 100vh
  const mynavbar = document.querySelector('nav.navbar');
  if (mynavbar) {
    mynavbar.classList.add('homepage-navbar');
  }
};
const HomePage = () => {
  addClassToNavbar();
  // ------ BELOW is all of state for dogs --------
  const [dogs, setDogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState();
  const [userDB, setUserDB] = useState([]);
  const [users, setUsers] = useState([]);

  // get current user uid to check for current dog
  const auth = getAuth(app);
  const user = auth.currentUser;

  // return all dogs except current user's dog
  const otherDogs = dogs.filter((dog) => {
    return dog.ownerId !== user.uid;
  });

  // shows owner's dog
  const currDog = dogs.filter((dog) => {
    return dog.ownerId === user.uid;
  });
  // console.log('THIS IS CURRDOG', currDog[0].ownerId);
  // console.log('this is user.uid', user.uid);

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  const [noCards, setNoCards] = useState(false);

  useEffect(() => {
    if (currentIndex < 0) {
      setNoCards(true);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (otherDogs.length > 0) setCurrentIndex(otherDogs.length - 1);
  }, [otherDogs.length]);

  // Tinder Card ref
  const childRefs = useMemo(
    () =>
      Array(otherDogs.length)
        .fill(0)
        .map((i) => React.createRef()),
    [otherDogs.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // card buttons
  const canGoBack = currentIndex < otherDogs.length - 1;

  const canSwipe = currentIndex >= 0;

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    else {
      const newIndex = currentIndex + 1;
      updateCurrentIndex(newIndex);
      await childRefs[newIndex].current.restoreCard();
    }
  };
  console.log('currDog outside', currDog);
  // adds swipe to db
  async function currDogDBLikes(id) {
    console.log('currDog inside', currDog);
    const currDogDB = doc(db, 'dogs', currDog[0].documentId);
    await updateDoc(currDogDB, {
      likes: arrayUnion(id),
    });
  }

  // stores current dog passed
  async function currDogDBPassed(id) {
    const currDogPassed = doc(db, 'dogs', currDog[0].documentId);
    await updateDoc(currDogPassed, {
      passed: arrayUnion(id),
    });
  }

  // add likedby to db
  async function swipedRtBy(id) {
    const swipeRtDB = doc(db, 'dogs', id);
    await updateDoc(swipeRtDB, {
      likedBy: arrayUnion(currDog[0].name),
    });
  }

  // find matches
  async function matched(id) {
    if (
      currDog[0].likes.includes(id.name) &&
      currDog[0].likedBy.includes(id.name)
    ) {
      currDog[0].matches.push(id);
      const currDogAddMatch = doc(db, 'dogs', currDog[0].documentId);
      await updateDoc(currDogAddMatch, {
        matches: arrayUnion(id.name),
      });
      const swipeDogAddMatch = doc(db, 'dogs', id.documentId);
      await updateDoc(swipeDogAddMatch, {
        matches: arrayUnion(currDog[0].name),
      });
    }
  }

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    // start our code

    // if right swipe
    if (direction === 'right') {
      currDog[0].likes.push(nameToDelete);
      otherDogs[index].likedBy.push(currDog[0]);
      // adds swiped dog to curr dog's likes field
      currDogDBLikes(otherDogs[index].name);
      // adds currDog to swipedDog's likedBy field
      swipedRtBy(otherDogs[index].documentId);
      matched(otherDogs[index]);
    } else {
      // if left swipe
      currDog[0].passed.push(nameToDelete);
      // adds swiped dog to currDog's passed field
      currDogDBPassed(otherDogs[index].name);
    }
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    console.log('IT DOES IT SWIPE?? IN THE SWIPE');

    if (canSwipe && currentIndex < otherDogs.length - 1) {
      console.log('IT SWIPES IN THE SWIPE');
      await childRefs[currentIndex].current.swipe(dir);
    } else {
      // setNoCards(true);
    }
  };
  // gets users collection
  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = [];

        querySnapshot.forEach((doc) => {
          // set single user
          if (user.uid === doc.data().uid) {
            setUserDB({ ...doc.data(), docId: doc.id });
          }
          // get all user for tinder dog to find owner

          const { uid, name, email } = { ...doc.data() };
          usersData.push({ uid, name, email });
        });
        setUsers(usersData);
      } catch (err) {
        console.log(err, 'who let the dogs out?');
      }
    })();
  }, []);
  // console.log('THIS IS OUR STATE user', userDB);

  // gets dog collection
  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'dogs'));
        const dogData = [];
        querySnapshot.forEach((doc) => {
          dogData.push(doc.data());
        });
        setDogs(dogData);
      } catch (err) {}
    })();
  }, []);
  // console.log('OTHER DOGS: ', otherDogs);

  return (
    <div
      style={{ backgroundColor: '#7ed7f0' }}
      className="tindercards cardContent homepage-wrapper container-fluid"
    >
      {noCards ? (
        <div>
          <EndOfDeck />
        </div>
      ) : (
        <div className="tinderCards__wrapper">
          <div className="row" style={{ backgroundColor: '#7ed7f0' }}>
            <div className="tinderCards__cardContainer col-12">
              {otherDogs.map((dog, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="swipe"
                  key={dog.name}
                  preventSwipe={['up', 'down']}
                  onSwipe={(dir) => swiped(dir, dog.name, index)}
                  onCardLeftScreen={() => outOfFrame(dog.name, index)}
                >
                  <div
                    style={{ backgroundImage: `url(${dog.imageUrl[0]})` }}
                    className="swipeCard"
                  ></div>
                  <Accordion>
                    <Accordion.Item eventKey="0" flush="true">
                      <Accordion.Header>Check Me Out!</Accordion.Header>
                      <Accordion.Body>
                        <h1>Hi! I'm {dog.name}</h1>
                        {/* <Row className="justify-content-center">
                          {dog.imageUrl.slice(1).map((pic) => (
                            <Col>
                              <Image
                                src={pic}
                                alt=""
                                thumbnail="true"
                                style={{
                                  height: '70%',
                                  width: '80%',
                                }}
                              />
                            </Col>
                          ))}
                        </Row> */}
                        <Row className="justify-content-center">
                          {dog.imageUrl.slice(1).map((pic) => (
                            <Row>
                              <Image
                                src={pic}
                                alt=""
                                thumbnail="true"
                                style={{
                                  height: '70%',
                                  width: '80%',
                                }}
                              />
                            </Row>
                          ))}
                        </Row>
                        <h3>Here's a bit about me: </h3>
                        {dog.bio ? (
                          <h5> {dog.bio} </h5>
                        ) : (
                          <h4> I love fetch! </h4>
                        )}
                        <h1>This is my hooman</h1>

                        <h4>
                          {users.find((user) => user.uid === dog.ownerId)
                            ? users.find((user) => user.uid === dog.ownerId)
                                .name
                            : 'I have no owner'}
                        </h4>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </TinderCard>
              ))}
            </div>
          </div>

          <div className="swipeButtons">
            {/* <IconButton
              className="swipeButtons__repeat"
              onClick={() => goBack()}
            >
              <ReplayIcon fontSize="large" />
            </IconButton> */}
            <IconButton
              className="swipeButtons__left"
              onClick={() => swipe('left')}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
            <IconButton
              className="swipeButtons__right"
              onClick={() => swipe('right')}
            >
              <FavoriteIcon fontSize="large" />
            </IconButton>
            {/* <Link to="/chat">
              <IconButton className="swipeButtons__message">
                <ChatIcon />
              </IconButton>
            </Link> */}
          </div>

          {/* {lastDirection ? (
            <h2 key={lastDirection} className="infoText">
              You swiped {lastDirection}
            </h2>
          ) : (
            <h2 className="infoText">{}</h2>
          )} */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
