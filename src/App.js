import React, { useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/user/Profile';
import Settings from './components/user/Settings';
import Preferences from './components/user/Preferences';
import SignUpUserInfo from './components/SignUpUserInfo';

// ---- FOR LOGIN CHECK -----------------------------
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Auth';

// -------------------------------------

function App() {
  // -------- FOR LOGIN CHECK -------------
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
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage />} />

          <Route path="/chat" element={<Chat />} />

          <Route path="/" element={<Login />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/user" element={<Profile />} />

          <Route path="/user-settings" element={<Settings />} />

          <Route path="/user-preferences" element={<Preferences />} />

          <Route path="/signupuser" element={<SignUpUserInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
