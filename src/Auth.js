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
import { provider, app, store } from './config/fbConfig';
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
// let currentUserDocumentId = '';

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const createdUserObjectInDB = await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    // // -------- RETURNS CURRENT USER'S DOCUMENT ID ----------------
    // console.log('document id:', createdUserObjectInDB.id);
    // currentUserDocumentId = createdUserObjectInDB.id;
    // console.log('THIS IS THE DOC ID exporting!!!!!!!', currentUserDocumentId);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// ---------- Forms for dog and auto-populate ----------

const inputDogInfo = async (name, age, breed, gender, size, bio) => {
  try {
    await addDoc(collection(db, 'dogs'), {
      name: name,
      age: age,
      gender: gender,
      breed: breed,
      size: size,
      bio: bio,
    });
  } catch (err) {
    console.log('UH OH DOGGO', err);
    alert(err.message);
  }
};

// -------- function that will send a pass reset link to an email address ------------------

// This code is simple. We are just passing in the email in the sendPasswordResetEmail function provided by Firebase. The password reset email will be sent by Firebase.
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// ----- logout function -----------------------
const logout = () => {
  signOut(auth);
};

// ----- ALL OUR EXPORTS ------------------------
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  inputDogInfo,
  // currentUserDocumentId,
};
