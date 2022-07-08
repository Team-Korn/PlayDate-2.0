import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// ------------------ FIREBASE SDK --------------------------------
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

// ----------- RECOGNIZES OUR PROJECT FROM FIREBASE -----------
const firebaseConfig = {
  // our config

  apiKey: 'AIzaSyA7BGrGY74CDLLDfTBakn8s-5BpXVKRkpA',
  authDomain: 'playdate-9bf9a.firebaseapp.com',
  projectId: 'playdate-9bf9a',
  storageBucket: 'playdate-9bf9a.appspot.com',
  messagingSenderId: '211081650181',
  appId: '1:211081650181:web:4ffb86866e49b88122bc6c',
};

// ----------- ACCESS DATABASE FROM FIRESTORE -----------

// const auth = firebase.auth()

// -------------- BELOW MIGHT BE OUTDATED CODE -----------------
// firebase.firestore().settings({ timestampsInSnapshots: true });

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db2 = firebaseApp.firestore();
const provider = new GoogleAuthProvider();
const auth = getAuth();
// const store = getFirestore();
export { provider, auth, app, db, db2 };
// -------------- BELOW MIGHT BE OUTDATED CODE -----------------
// firebase.firestore().settings({ timestampsInSnapshots: true });

/*

use for hooks later

// --------------- HOOKS -----------------------------------------
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// --------- TO USE AS GLOBAL VARIABLES -------------------------
const auth = firebase.auth();
const firestore = firebase.firestore();

*/
