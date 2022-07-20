import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Auth';
import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/fbConfig';
// import { connectStorageEmulator } from 'firebase/storage';
import './signupUser.css';

function SignUpUserInfo() {
  const [loading] = useAuthState(auth);
  const navigate = useNavigate();

  // ----- get current users uid -------------
  const currentUser = auth.currentUser;
  // console.log('THIS IS currentUser', currentUser);

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
    console.log('current user info', user);

    setDoc(currentUserRefDB, { zipcode, city, state }, { merge: true }).then(
      (res) => {
        console.log('updated user info', res);
        navigate('/dogregister');
      }
    );
  };

  return (
    <div className="userInfo_container container-fluid ">
      <div className="container">
        <form classname="additionalUserInfo" onSubmit={handleSubmit}>
          <div className="row">
            <div
              style={{
                fontSize: '1.5em',
                fontWeight: 'bold',
              }}
              id="form-Header"
            >
              Location
            </div>

            <div className="col-12 col-md-6">
              <input
                required
                id="zipcode"
                type="text"
                className="input-area userInfo__container "
                placeholder="Zipcode"
              />
              <input
                required
                id="city"
                type="text"
                className="input-area userInfo__container "
                placeholder="City"
              />
              <input
                required
                id="state"
                type="text"
                className="input-area userInfo__container "
                placeholder="State"
              />
              <input
                className=" md={{ span: 3, offset: 3 }}"
                type="submit"
                id="submit"
                value="Submit Changes"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpUserInfo;
