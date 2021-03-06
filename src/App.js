import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/Navbar';
import Chat from './components/Chat';
import PrivateChat from './components/PrivateChat';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/user/Profile';
import SignUpUserInfo from './components/SignUpUserInfo';
import ErrorPage from './components/ErrorPage';
import DogRegister from './components/InputDogInfoReg';
import UserSettings from './components/user/UserSettings';
import DogSettings from './components/user/DogSettings';

// ---- FOR LOGIN CHECK -----------------------------
// import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Auth';
import NavbarNotSignedIn from './components/NavBarNotSignedIn';
import './components/utility.css';
// -------------------------------------

function App() {
  // -------- FOR LOGIN CHECK -------------
  const [user] = useAuthState(auth);

  if (!user) {
    return (
      <div className="firstLogIn">
        <BrowserRouter>
          <NavbarNotSignedIn />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Login />} />
            <Route path="/chat" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/home" element={<HomePage />} />

            <Route path="/chat" element={<Chat />} />

            <Route path="/chat/private" element={<PrivateChat />} />

            <Route path="/" element={<Login />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/user" element={<Profile />} />

            <Route path="/userSettings" element={<UserSettings />} />

            <Route path="/dogSettings" element={<DogSettings />} />

            <Route path="/signupuser" element={<SignUpUserInfo />} />

            <Route path="/dogregister" element={<DogRegister />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
