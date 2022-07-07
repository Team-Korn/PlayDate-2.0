import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, query } from 'firebase/firestore';
import { provider, auth, app, store } from '../config/fbConfig';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const HomePage = () => {
  const [dogs, setDogs] = useState([]);

  const db = getFirestore(app);

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
  return <h1>{dogs[1].Name}</h1>;
};

export default HomePage;
