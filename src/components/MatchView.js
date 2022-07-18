import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { app, db } from '../../config/fbConfig';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

const MatchView = () => {
  return <h1>You have a match!</h1>;
};
