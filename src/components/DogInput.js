import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Auth';
import { collection, getDocs, doc, addDoc } from 'firebase/firestore';
import { db } from '../config/fbConfig';

// ------- ADD DOG INFO AFTER REGISTERING --------
function DogRegisterInfoForm() {
  // ----- get current users uid -------------
  const currentUser = auth.currentUser;
  // console.log('THIS IS currentUser', currentUser);
  console.log('hello user', currentUser);

  //grab current user from db
  const [user, setUser] = useState({});
  // ---- set age to integer??? -----------
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [imageUrl, setImageUrl] = useState([]);
  const [size, setSize] = useState('');
  // const [user, loading, error] = useAuthState(auth);

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
  console.log('user is: ', user);

  return (
    <div className="dogInfo_container container-fluid-bg-white">
      <div className="container">
        <h1>Let's Setup Your Dog's Profile</h1>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Full Name"
        />
      </div>
    </div>
  );
}

export default DogRegisterInfoForm;
