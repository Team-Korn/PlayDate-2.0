import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, currentUserDocumentId } from '../Auth';
import './SignUpUserInfo.css';
import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/fbConfig';
import { connectStorageEmulator } from 'firebase/storage';

const documentId = currentUserDocumentId;

function SignUpUserInfo() {
  // ------ current user's document ID ------
  console.log('IS DOC ID HERE???', documentId);

  // const navigate = useNavigate(); -- not sure if necessary

  // ----- get current users uid -------------
  const currentUser = auth.currentUser;
  console.log('THIS IS currentUser', currentUser);

  // const [zipcode, setZipcode] = useState('');
  // const [state, setState] = useState('');
  // const [city, setCity] = useState('');
  // const [user, loading] = useAuthState(auth);

  //grab all users from db
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });

        setUsers(userData);
      } catch (err) {
        console.log(err, 'what happened? where is everyone?');
      }
    })();
  }, []);

  // -------find the current users object ------
  const currUser = users.filter((user) => {
    return user.uid === currentUser.uid;
  });

  // ------ ABLE TO FIND PROPER USER USING DOC ID --
  const currentUserRefDB = doc(db, 'users', documentId);

  const handleSubmit = (event) => {
    event.preventDefault();
    let zipcode = document.getElementById('zipcode').value;

    setDoc(currentUserRefDB, { zipcode: zipcode }, { merge: true });

    console.log('zipcode is: ', zipcode);
    console.log('inside zipcode is docID correct??', documentId);
    console.log('current user info', currUser);

    // const currUserDB = doc(db, 'users', currUser[0].name);

    // console.log(currUserDB);

    // if (currUser) {
    //   // const currUserDB = doc(db, 'users', currUser[0]);
    //   // console.log('currUserDB: ', currUserDB[0]);
    //   console.log(
    //     'What is the value?',
    //     document.getElementById('zipcode').value
    //   );

    //   addUserInfo(zipcode).then(alert('Successfully added location'));
    // }
  };

  // useEffect(() => {
  //   if (loading) return;
  //   if ((onclick = { Submit })) navigate('/userPhoto');
  // }, [loading, navigate]);

  return (
    <div className="registerUserInfo">
      <div className="userInfo_container">
        <form classname="additionalUserInfo" onSubmit={handleSubmit}>
          <div id="form-Header">Location</div>
          <input
            id="zipcode"
            type="text"
            className="userInfo__container"
            // value={zipcode}
            // onChange={(event) => setZipcode(event.target.value)}
            placeholder="Zipcode"
          />
          {/* <button className="userInfo__btn" type="submit">
            Continue
          </button> */}
          <div>
            <input type="submit" id="submit" value="Submit Changes" />
          </div>
        </form>
        {/* <input
          type="text"
          className="userInfo__container"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="City"
        />
        <input
          type="text"
          className="userInfo__container"
          value={state}
          onChange={(event) => setState(event.target.value)}
          placeholder="State"
        />
         */}

        {/* <div>
            Already have an account? <Link to="/">Login</Link> now.
          </div> */}
      </div>
    </div>
  );
}

export default SignUpUserInfo;
