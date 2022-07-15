import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { currDog, otherDogs, matched } from './HomePage';

const GuestProfile = () => {
  console.log('OTHER DOGS: ', otherDogs);
  return <h1>{currDog}</h1>;
};

export default GuestProfile;
