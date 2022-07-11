import React, { useState, useEffect } from 'react';
import Card from './Card';

const HomePage = () => {
  // (async () => {
  //   const docRef = doc(db, 'dogs', 'dog2');
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     console.log('Document data:', docSnap.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log('No such document!');
  //   }
  // })();

  // (async () => {
  //   const querySnapshot = await getDocs(collection(db, 'dogs'));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, ' => ', doc.data());
  //   });
  // })();

  return (
    <div>
      <Card />
    </div>
  );
};

export default HomePage;
