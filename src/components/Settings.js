import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { app } from '../config/fbConfig';
import { getFirestore } from 'firebase/firestore';

const Settings = () => {
  return(
    <h1>Welcome To Your Settings</h1>
  )
}

export default Settings
