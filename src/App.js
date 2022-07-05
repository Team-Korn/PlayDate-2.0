import React from 'react';

// ------------------ FIREBASE SDK --------------------------------
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

// --------------- HOOKS -----------------------------------------
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// ----------- RECOGNIZES OUR PROJECT FROM FIREBASE -----------
firebase.initializeApp({
  // our config

  apiKey: 'AIzaSyA7BGrGY74CDLLDfTBakn8s-5BpXVKRkpA',
  authDomain: 'playdate-9bf9a.firebaseapp.com',
  projectId: 'playdate-9bf9a',
  storageBucket: 'playdate-9bf9a.appspot.com',
  messagingSenderId: '211081650181',
  appId: '1:211081650181:web:4ffb86866e49b88122bc6c',
});

// --------- TO USE AS GLOBAL VARIABLES -------------------------
const auth = firebase.auth();
const firestore = firebase.firestore();

// function App() {
//   return <div className="App">
//     Welcome to PlayDate!</div>;
// }

// ------- ADDING A COMPONENT ---------------------------------
class App extends Component {
  render() {
    return (
      <div>
        <h1>Looking for Similar 4 Legged Playmates</h1>
      </div>
    );
  }
}

export default App;

/*

// --------------- FIREBASE INITIAL ------------------

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7BGrGY74CDLLDfTBakn8s-5BpXVKRkpA",
  authDomain: "playdate-9bf9a.firebaseapp.com",
  projectId: "playdate-9bf9a",
  storageBucket: "playdate-9bf9a.appspot.com",
  messagingSenderId: "211081650181",
  appId: "1:211081650181:web:4ffb86866e49b88122bc6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

*/
