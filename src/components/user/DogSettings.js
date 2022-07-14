import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { app, db } from '../../config/fbConfig';
import { getAuth } from 'firebase/auth';
import './Settings.css'

const DogSettings = () => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'dogs'));
        const dogData = [];
        querySnapshot.forEach((doc) => {
          dogData.push(doc.data());
        });
        setDogs(dogData);
      } catch (err) {
        collection.log(err, 'who let the dogs out?');
      }
    })();
  }, []);

  const currDog = dogs.filter((dog) => {
    return dog.ownerId === user.uid;
  });

  if(!dogs[0]) {
    console.log('No Dogs Here!');
  } else {
    return (
      <div className="container">
        <form className='settings'>
          <div className="row">
            <div className="col-25">
              <label htmlFor="name">Name</label>
            </div>
            <div className="col-75">
              <input type="text"  name="name" placeholder={currDog[0].name}/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="breed">Breed</label>
            </div>
            <div className="col-75">
              <input type="text" name="breed" placeholder={currDog[0].breed}/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="size">Size</label>
            </div>
            <div className="col-75">
              <select name="size">
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="about-me">About me</label>
            </div>
            <div className="col-75">
              <textarea id="about-me" name="subject" placeholder={currDog[0].bio} ></textarea>
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    )
  }
}

export default DogSettings
