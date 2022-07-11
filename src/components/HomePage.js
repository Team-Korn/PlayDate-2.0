import React, { useEffect, useState } from 'react';
import SwipeCard from './SwipeCard';
import SwipeButton from './SwipeButton';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Auth';

const HomePage = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      return;
    }
  }, [user, loading, navigate]);

  return (
    <div>
      <SwipeCard />
      <SwipeButton />
    </div>
  );
};

export default HomePage;
