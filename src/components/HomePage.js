// ------- FOR KATIE -------------------
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
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

const HomePage = () => {
  const [dogs, setDogs] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(dogs.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  // Tinder Card ref
  const childRefs = useMemo(
    () =>
      Array(dogs.length)
        .fill(0)
        .map((i) => React.createRef()),
    [dogs.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // card buttons
  const canGoBack = currentIndex <= dogs.length - 1;

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

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    console.log(currDog[0].likes);
    if (direction === 'right') {
      currDog[0].likes.push(nameToDelete);
      otherDogs[index].likedBy.push(currDog[0]);
      // helper function to access likedBy on nameToDelete
      console.log(
        'OTHER DOG LIKEDBY ',
        otherDogs[index].likedBy,
        otherDogs[index].name
      );
      console.log('CURR DOG LIKES:', currDog[0].likes);
    } else {
      currDog[0].passed.push(nameToDelete);
      console.log('OTHER DOG:  ', otherDogs[index].size);
      console.log('CURR DOG PASS:', currDog[0].passed);
    }
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < dogs.length) {
      await childRefs[currentIndex].current.swipe(dir);
      // Swipe the card!
      // if (dir === 'right') {
      //   console.log('you really like em');
      // } else {
      //   console.log('PASS: ');
      // }
    } else {
      // TODO set some message that there are no more swipes available
      console.log('DONE!');
    }
  };

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
      } catch (err) {
        collection.log(err, 'who let the dogs out?');
      }
    })();
  }, []);

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

  return (
    <div className="tindercards cardContent">
      <div className="tinderCards__cardContainer">
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
              style={{ backgroundImage: `url(${dog.imageUrl[1]})` }}
              className="swipeCard"
            >
              <h1>{dog.name}</h1>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="swipeButtons">
        <IconButton className="swipeButtons__repeat" onClick={() => goBack()}>
          <ReplayIcon fontSize="large" />
        </IconButton>
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
        <Link to="/chat">
          <IconButton className="swipeButtons__message">
            <ChatIcon />
          </IconButton>
        </Link>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
};

export default HomePage;
