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
import ErrorPage from './components/ErrorPage';
import GuestProfile from './components/GuestProfile';

// ---- FOR LOGIN CHECK -----------------------------
// import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Auth';

// -------------------------------------

function App() {
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   } else {
  //     return;
  //   }
  // }, [user, navigate]);

  // -------- FOR LOGIN CHECK -------------
  const [user] = useAuthState(auth);
  // const [users, setUsers] = useState([]);
  // {isAdmin !== false ? <Route path="/admin" component={AdminView} /> : ''}

  if (!user) {
    return (
      <div className="firstLogIn">
        <BrowserRouter>
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

            <Route path="/friend" element={<GuestProfile />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
