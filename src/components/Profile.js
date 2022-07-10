import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { app } from '../config/fbConfig';
import { getFirestore } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import './Profile.css';

const Profile = (props) => {
  const [dogs, setDogs] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    async function getDogs() {
      try {
        const querySnapshot = await getDocs(collection(db, 'dogs'));
        // console.log('QS: ', querySnapshot.docs);
        const dogData = [];
        querySnapshot.forEach((doc) => {
          dogData.push(doc.data());
        });
        console.log('DD: ', dogData);
        setDogs(dogData);
      } catch (error) {
        console.log(error);
      }
    }
    getDogs();
  }, []);
  console.log('dogs', dogs);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        console.log('UD: ', userData);
        setUsers(userData);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);
  console.log('users', users);

  const handleClick = () => {
    props.history.push('/profile-settings');
  };

  if (!dogs[0]) return null;
  return (
  <div className='profile-view'>
    <div class="card">
      <div class="img-avatar"></div>
        <div class="card-text">
          <div class="portada">
          </div>
          <div class="title-total">
            <div class="title">Australian Cattle/ Beagle</div>
            <h2>Ernie</h2>
        <div class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        </div>
      </div>
    </div>
    <div>
      <Link to="/settings">
      <button>Settings</button>
      </Link>
    </div>
  </div>
  )
};

export default Profile;
