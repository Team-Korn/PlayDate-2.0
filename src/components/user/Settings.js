import React from 'react';
import './Settings.css'
import UserSettings from './UserSettings';
import DogSettings from './DogSettings';

const Settings = () => {
  return (
  <div className='Settings-view'>
    <UserSettings />
    <DogSettings />
  </div>
  )
}

export default Settings
