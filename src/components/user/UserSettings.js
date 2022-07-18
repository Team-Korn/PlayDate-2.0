import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { app, db } from '../../config/fbConfig';
import { getAuth } from 'firebase/auth';
import './Settings.css'

const UserSettings = () => {
  //get current users uid
  const auth = getAuth(app);
  const authUser = auth.currentUser;

  // grab all users from db
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });

        setUsers(userData);
      } catch (err) {
        console.log(err, 'who let the dogs out?');
      }
    })();
  }, []);

  const currUser = users.filter(user => {
    return user.uid === authUser.uid
  })

  //save data to firestore

  const handleSubmit = (e) => {
    if(authUser){
      let name = document.getElementById('name').value;
      let email = document.getElementById('email').value;
      let city = document.getElementById('city').value;
      let state = document.getElementById('state').value;
      let zipcode = document.getElementById('zipcode').value;
      async function updateSettings() {
        const currUserDB = doc(db, 'users', currUser[0].documentId)
        await updateDoc(currUserDB, {
          name: name,
          email: email,
          city: city,
          state: state,
          zipcode: zipcode
        })
      }
      e.preventDefault();
      updateSettings();
      alert('Your changes have been saved!')
    }
  }

if(!currUser[0]) {
    console.log('NO USER FOUND!');
  } else {
    return (
      <div className="container">
      <form className='settings' onSubmit={handleSubmit}>
        <div id='form-title'>User Settings</div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="name">Name</label>
          </div>
          <div className="col-75">
            <input id="name" type="text" name="name" defaultValue={currUser[0].name} required/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="email">Email</label>
          </div>
          <div className="col-75">
            <input id="email" type="text" name="email" defaultValue={currUser[0].email} required/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="city">City</label>
          </div>
          <div className="col-75">
            <input id="city" type="text" name="city" defaultValue={currUser[0].city} required/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="state">State</label>
          </div>
          <div className="col-75">
            <input id="state" type="text"  name="state" defaultValue={currUser[0].state} required/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="zip">Zipcode</label>
          </div>
          <div className="col-75">
          <input id="zipcode" type="text"  name="zip" defaultValue={currUser[0].zipcode} required/>
          </div>
        </div>
        <div className="row">
          <input type="submit"  id="submit" value="Submit Changes"/>
        </div>
      </form>
    </div>
    )
  }
}

export default UserSettings
