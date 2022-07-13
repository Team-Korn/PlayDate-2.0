import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { app, db } from '../../config/fbConfig';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './Profile.css'

const Profile = () => {
  // get current user uid to check for current dog
  const auth = getAuth(app);
  const user = auth.currentUser;

  // console.log('CURRENT USER: ',user.uid);

  // gets dog collection
  const [dogs, setDogs] = useState([]);

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

  console.log('DOGS: ', dogs)

  // shows owner's dog
  const currDog = dogs.filter((dog) => {
    return dog.ownerId === user.uid;
  });
  console.log('MY DOG: ', currDog)

// querying dog collection using where
  // const getMyDog = async () => {
  // const q = query(collection(db, "dogs"), where("ownerId", "==", "user.uid" ));
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
// }
if (!dogs[0]) {
  console.log('No Dogs!'); }
  else {
    return (
    <div className='profile-view'>
      <div className="card">
        <div className="img-avatar"></div>
          <div className="card-text">
            <div className="portada">
            </div>
            <div className="title-total">
              <div className="title">{currDog[0].breed}</div>
                <h2>{currDog[0].name}</h2>
                <div className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                <div className='button-container'>
                  <Link className='settings-button' to="/user-settings">
                    <button>Settings</button>
                  </Link>
                  <Link className='preferences-button' to="/user-preferences">
                    <button>Preferences</button>
                  </Link>
                </div>
              </div>
          </div>
      </div>
    </div>
    )
  }
};

export default Profile;
