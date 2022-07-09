import React from 'react';
import SwipeCard from './SwipeCard';
import SwipeButton from './SwipeButton';

const HomePage = (props) => {
  console.log('PROPS: ', props);
  return (
    <div>
      <SwipeCard />
      <SwipeButton />
    </div>
  );
};

export default HomePage;
