import React, { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, inputDogInfo } from '../Auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/fbConfig';
import { useNavigate } from 'react-router-dom';

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
  const [imageUrl, setImageUrl] = useState([]);
  const [size, setSize] = useState('');
  const [bio, setBio] = useState('');
  // const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate('/home');

  const addDogDocumentAndInfo = () => {
    const userUID = user.uid;
    const ownerName = user.name;
    inputDogInfo(
      name,
      age,
      breed,
      gender,
      size,
      bio,
      imageUrl,
      userUID,
      ownerName
    );
    navigate('/home');
  };

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
  // console.log('this is the user: ', user);

  return (
    <div className="dogInfo_container container-fluid-bg-white">
      <div className="container">
        <h1>Your Dog's Profile</h1>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Dog's Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          placeholder="Age"
        />
        <input
          type="text"
          className="register__textBox"
          value={breed}
          onChange={(event) => setBreed(event.target.value)}
          placeholder="Breed"
        />
        <input
          type="text"
          className="register__textBox"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          placeholder="Gender"
        />
        <input
          type="text"
          className="register__textBox"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          placeholder="Introduce yourself!"
        />
        <input
          type="text"
          className="register__textBox"
          value={size}
          onChange={(event) => setSize(event.target.value)}
          placeholder="All sizes welcome! Are you a small, medium, or large dog?"
        />
        <input
          type="text"
          className="register__textBox"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="Add your picture in imageUrl formatting!"
        />
        <button className="register__btn" onClick={addDogDocumentAndInfo}>
          Register
        </button>
      </div>
    </div>
  );
}

export default DogRegisterInfoForm;
