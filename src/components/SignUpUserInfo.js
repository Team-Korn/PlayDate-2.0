import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, currentUserDocumentId } from '../Auth';
import './SignUpUserInfo.css';
import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/fbConfig';
// import { connectStorageEmulator } from 'firebase/storage';

function SignUpUserInfo() {
  // const navigate = useNavigate(); -- not sure if necessary

  // ----- get current users uid -------------
  const currentUser = auth.currentUser;
  console.log('THIS IS currentUser', currentUser);

  //grab current user from db
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = [];
        /// exposing all USERS from db into state; BAD;
        // Better: Set only the user that you wnat.
        querySnapshot.forEach((doc) => {
          if (currentUser.uid === doc.data().uid) {
            setUser({ ...doc.data(), docId: doc.id });
          }
          userData.push(doc.data());
        });
      } catch (err) {
        console.log(err, 'what happened? where is everyone?');
      }
    })();
  }, []);

  const handleSubmit = (event) => {
    const currentUserRefDB = doc(db, 'users', user.docId);

    event.preventDefault();
    let zipcode = document.getElementById('zipcode').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;

    // console.log('zipcode is: ', zipcode, city, state);
    // console.log('current user info', user);

    setDoc(currentUserRefDB, { zipcode, city, state }, { merge: true });
  };

  // useEffect(() => {
  //   if (loading) return;
  //   if ((onclick = { Submit })) navigate('/userPhoto');
  // }, [loading, navigate]);

  return (
    <div className="userInfo_container">
      <form classname="additionalUserInfo" onSubmit={handleSubmit}>
        <div id="form-Header">Location</div>
        <input
          id="zipcode"
          type="text"
          className="userInfo__container"
          placeholder="Zipcode"
        />
        <input
          id="city"
          type="text"
          className="userInfo__container"
          placeholder="City"
        />
        <input
          id="state"
          type="text"
          className="userInfo__container"
          placeholder="State"
        />
        {/* <button className="userInfo__btn" type="submit">
            Continue
          </button> */}
        <div>
          <input type="submit" id="submit" value="Submit Changes" />
        </div>
      </form>
    </div>
  );
}

export default SignUpUserInfo;
