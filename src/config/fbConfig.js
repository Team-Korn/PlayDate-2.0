// ------------------ FIREBASE SDK --------------------------------
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// ----------- RECOGNIZES OUR PROJECT FROM FIREBASE -----------
const firebaseApp = firebase.initializeApp({
  // our config

  apiKey: 'AIzaSyA7BGrGY74CDLLDfTBakn8s-5BpXVKRkpA',
  authDomain: 'playdate-9bf9a.firebaseapp.com',
  projectId: 'playdate-9bf9a',
  storageBucket: 'playdate-9bf9a.appspot.com',
  messagingSenderId: '211081650181',
  appId: '1:211081650181:web:4ffb86866e49b88122bc6c',
});

// ----------- ACCESS DATABASE FROM FIRESTORE -----------
const db = firebaseApp.firestore()

// const auth = firebase.auth()


// -------------- BELOW MIGHT BE OUTDATED CODE -----------------
// firebase.firestore().settings({ timestampsInSnapshots: true });

export { db };

/*

use for hooks later

// --------------- HOOKS -----------------------------------------
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// --------- TO USE AS GLOBAL VARIABLES -------------------------
const auth = firebase.auth();
const firestore = firebase.firestore();

*/
