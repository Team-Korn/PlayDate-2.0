import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { app } from '../../config/fbConfig';
import { getFirestore } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import './Profile.css';

const Profile = () => {
  const [dogs, setDogs] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    async function getDogs() {
      try {
        const querySnapshot = await getDocs(collection(db, 'dogs'));
        const dogData = [];
        querySnapshot.forEach((doc) => {
          dogData.push(doc.data());
        });
        setDogs(dogData);
      } catch (error) {
        console.log(error);
      }
    }
    getDogs();
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setUsers(userData);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  if (!dogs[0]) return null;
  return (
  <div className='profile-view'>
    <div className="card">
      <div className="img-avatar"></div>
        <div className="card-text">
          <div className="portada">
          </div>
          <div className="title-total">
            <div className="title">Australian Cattle/ Beagle</div>
              <h2>Ernie</h2>
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
};

export default Profile;
