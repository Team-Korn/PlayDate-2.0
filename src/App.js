import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Settings from './components/Settings';
import SignUpUserInfo from './components/SignUpUserInfo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage />} />

          <Route path="/chat" element={<Chat />} />

          <Route path="/" element={<Login />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/profile-settings" element={<Settings />} />

          <Route path="/signupuser" element={<SignUpUserInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
