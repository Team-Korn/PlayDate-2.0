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

// ------ Google Authentication Function ---------------------------
// https://blog.logrocket.com/user-authentication-firebase-react-apps/

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

// ------- Sign In with Email and Password ----------------
// ------- This is when a user already registered with us and we don't need to check the database -----
// ------- Pass the email and password directly to signInWithEmailAndPassword function from FB --------

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// ------ function for registering a user with email and pass -----

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// ------ My Login Function --------------------------------

const Login = () => {
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

  console.log('users are here: ', users);
  if (!users[0]) return null;
  return <h1>{users[4].firstName}</h1>;
};

export default Login;