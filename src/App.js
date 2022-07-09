import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <h1> Welcome to PlayDate!</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/chat" element={<Chat />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
