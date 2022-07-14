import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { app, db } from '../../config/fbConfig';
import { getAuth } from 'firebase/auth';
import './Settings.css'

const UserSettings = () => {
  //get current users uid
  const auth = getAuth(app);
  const authUser = auth.currentUser;
  // console.log("THIS IS THE USER: ", authUser)

  //grab all users from db
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

  // console.log('USERS: ', users)

  //find the current users object
  const currUser = users.filter(user => {
    return user.uid === authUser.uid
  })

  console.log("CURRENT USER DATA: ", currUser);

  if(!currUser[0]) {
    console.log('NO USER FOUND!');
  } else {
    return (
      <div className="container">
      <form className='settings'>
        <div className="row">
          <div className="col-25">
            <label htmlFor="name">Name</label>
          </div>
          <div className="col-75">
            <input type="text" name="name" placeholder={currUser[0].name}/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="email">Email</label>
          </div>
          <div className="col-75">
            <input type="text" name="email" placeholder={currUser[0].email}/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="city">City</label>
          </div>
          <div className="col-75">
            <input type="text" name="city" placeholder={currUser[0].city}/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="state">State</label>
          </div>
          <div className="col-75">
            <input type="text"  name="state" placeholder={currUser[0].state}/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="zip">Zipcode</label>
          </div>
          <div className="col-75">
          <input type="text"  name="zip" placeholder={currUser[0].zipcode}/>
          </div>
        </div>
        <div className="row">
          <input type="submit" value="Submit Changes"/>
        </div>
      </form>
    </div>
    )
  }
}

export default UserSettings
