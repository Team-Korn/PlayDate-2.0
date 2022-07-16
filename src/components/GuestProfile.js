import React from 'react';
import './Card.css';

const GuestProfile = () => {
  return (
    <div className="Card">
      <div className="upper-container">
        <div className="image-container">
          <img src=" " alt="" height="100px" width="100px" />
        </div>
      </div>
      <div className="lower-container">
        <h3>Name</h3>
        <h4>size</h4>
        <p> bio</p>
      </div>
    </div>
  );
};
