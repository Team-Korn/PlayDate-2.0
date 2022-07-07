// -------- LogRocket Firebase react auth imports ----------------
// import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';

// ---------- imports from Homepage ------------------------
import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  query,
  getFirestore,
  where,
  addDoc,
} from 'firebase/firestore';
import { provider, app, store } from '../config/fbConfig';
import { getStorage } from 'firebase/storage';

// ------ global variables so we can use Firebase throughout our app ------
// ------ Might need to be in Config or declare in each component ---------
const db = getFirestore(app);
const auth = getAuth(app);

// ------ Google Authentication Function ---------------------------------

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// ------ Login function --------------------------------

const Login = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    async function getDogs() {
      try {
        const querySnapshot = await getDocs(collection(db, 'doggos'));

        // console.log('QS: ', querySnapshot.docs);
        const dogData = [];
        querySnapshot.forEach((doc) => {
          dogData.push(doc.data());
        });
        // console.log('DD: ', dogData);
        setDogs(dogData);
      } catch (error) {
        console.log(error);
      }
    }
    getDogs();
  }, []);
  console.log('dogs', dogs);
  if (!dogs[0]) return null;
  return <h1>{dogs[4].Name}</h1>;
};

export default Login;
