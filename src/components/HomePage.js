// ------- FOR KATIE -------------------
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/fbConfig';
import TinderCard from 'react-tinder-card';
import './SwipeCard.css';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import './SwipeButtons.css';
import { Link } from 'react-router-dom';

// ------ FOR ADDING LOGIN CHECK -----------------
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Auth';

const HomePage = () => {
  // -------- FOR LOGIN CHECK -------------
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      return;
    }
  }, [user, loading, navigate]);

  // -------- FOR KATIE -------------------
  const [dogs, setDogs] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(dogs.length - 1);
  const [lastDirection, setLastDirection] = useState();

  const currentIndexRef = useRef(currentIndex);

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
  const canGoBack = currentIndex <= dogs.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < dogs.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  console.log('CURR IDX: ', currentIndex + 1);
  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    else {
      const newIndex = currentIndex + 1;
      updateCurrentIndex(newIndex);
      await childRefs[newIndex].current.restoreCard();
    }
  };

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

  if (!dogs[0]) return null;

  return (
    <div className="tindercards cardContent">
      <div className="tinderCards__cardContainer">
        {dogs.map((dog, index) => (
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
