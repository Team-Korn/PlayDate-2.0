import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../Auth';
// import './SignUpUserInfo.css';

function SignUpUserInfo() {
  const navigate = useNavigate();

  const [zipcode, setZipcode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [user, loading] = useAuthState(auth);

  const register = () => {
  //   if (!name) alert('Please enter name');
  //   registerWithEmailAndPassword(name, email, password);
  // };
  // function handleClick() {
  //   navigate('/');
  // }

  useEffect(() => {
    if (loading) return;
    if (state && city && zipcode) navigate('/userPhoto');
  }, [user, loading, navigate]);

  return (
    <div className="userInfo">
      <div className="userInfo_container">
        <input
          type="text"
          className="userInfo__container"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="userInfo__container"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="userInfo__container"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Continue
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default SignUpUserInfo;
