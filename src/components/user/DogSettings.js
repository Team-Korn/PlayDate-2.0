import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
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

  console.log("THIS IS MY DOG: ", currDog)

  const handleSubmit = (e) => {
    if(user) {
      let name = document.getElementById('name').value;
      let breed = document.getElementById('breed').value;
      let size = document.getElementById('size').value;
      let bio = document.getElementById('about-me').value;

      async function updateSettings() {
        const currDogDB = doc(db, 'dogs', currDog[0].documentId)
        await updateDoc(currDogDB, {
          name: name,
          breed: breed,
          size: size,
          bio: bio
        })
      }
      e.preventDefault();
      updateSettings();
      alert('Your changes have been saved!')
    }
  }

  if(!dogs[0]) {
    console.log('No Dogs Here!');
  } else {
    return (
      <div className="container">
        <form className='settings' onSubmit={handleSubmit}>
          <div id='form-title'>Dog Settings</div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="name">Name</label>
            </div>
            <div className="col-75">
              <input id='name' type="text"  name="name" defaultValue={currDog[0].name}/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="breed">Breed</label>
            </div>
            <div className="col-75">
              <input id='breed' type="text" name="breed" defaultValue={currDog[0].breed}/>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="size">Size</label>
            </div>
            <div className="col-75">
              <select name="size" id="size">
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
              <textarea id="about-me" name="subject" defaultValue={currDog[0].bio} ></textarea>
            </div>
          </div>
          <div className="row">
            <input type="submit" id="submit" value="Submit"/>
          </div>
        </form>
      </div>
    )
  }
}

export default DogSettings
