import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/chat" element={<Chat />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
