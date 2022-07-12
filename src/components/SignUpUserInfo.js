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

  // const addUserInfo = () => {
  //   if (!name) alert('Please enter name');
  //   registerWithEmailAndPassword(name, email, password);
  // };
  function handleClick() {
    navigate('/');
  }

  // useEffect(() => {
  //   if (loading) return;
  //   if ((onclick = { Submit })) navigate('/userPhoto');
  // }, [loading, navigate]);

  return (
    <div className="userInfo">
      <div className="userInfo_container">
        <input
          type="text"
          className="userInfo__container"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="City"
        />
        <input
          type="text"
          className="userInfo__container"
          value={state}
          onChange={(event) => setState(event.target.value)}
          placeholder="State"
        />
        <input
          type="text"
          className="userInfo__container"
          value={zipcode}
          onChange={(event) => setZipcode(event.target.value)}
          placeholder="Zipcode"
        />
        {/* <button className="userInfo__btn" onClick={}>
            Register
          </button> */}{' '}
        {/* <button */}
        {/* className="register__btn register__google"
            onClick={signInWithGoogle}
          >
            Continue
          </button> */}
        {/* <div>
            Already have an account? <Link to="/">Login</Link> now.
          </div> */}
      </div>
    </div>
  );
}

export default SignUpUserInfo;
