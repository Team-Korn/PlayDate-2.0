import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { app, db } from '../../config/fbConfig';
import { getAuth } from 'firebase/auth';
// import './Settings.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

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

  const currUser = users.filter((user) => {
    return user.uid === authUser.uid;
  });

  //save data to firestore

  const handleSubmit = (e) => {
    if (authUser) {
      let name = document.getElementById('name').value;
      let email = document.getElementById('email').value;
      let city = document.getElementById('city').value;
      let state = document.getElementById('state').value;
      let zipcode = document.getElementById('zipcode').value;
      async function updateSettings() {
        const currUserDB = doc(db, 'users', currUser[0].documentId);
        await updateDoc(currUserDB, {
          name: name,
          email: email,
          city: city,
          state: state,
          zipcode: zipcode,
        });
      }
      e.preventDefault();
      updateSettings();
      alert('Your changes have been saved!');
    }
  };

  const navigate = useNavigate();
  const navigateProfile = () => {
    navigate('/user');
  };
  if (!currUser[0]) {
    console.log('NO USER FOUND!');
  } else {
    return (
      <div className="container">
        <Form className="settings" onSubmit={handleSubmit}>
          <h1>Edit Human Information</h1>
          <br />
          <Form.Group className="mb-3" controlId="formGridName">
            <Form.Label className="label">Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={currUser[0].name}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              type="email"
              defaultValue={currUser[0].email}
              required
            />
          </Form.Group>

          <Row className="mb-3" align-items-center>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label className="label">City</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currUser[0].city}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridBreed">
              <Form.Label className="label">State</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currUser[0].state}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label className="label">Zip Code</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currUser[0].zipcode}
                required
              />
            </Form.Group>
          </Row>
          <br />
          <Button
            className="submit__btn"
            type="submit"
            onClick={navigateProfile}
          >
            Submit Changes
          </Button>
        </Form>
      </div>

      //   <div className="container">
      //   <form className='settings' onSubmit={handleSubmit}>
      //     <div id='form-title'>User Settings</div>
      //     <div className="row">
      //       <div className="col-25">
      //         <label htmlFor="name">Name</label>
      //       </div>
      //       <div className="col-75">
      //         <input id="name" type="text" name="name" defaultValue={currUser[0].name} required/>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <div className="col-25">
      //         <label htmlFor="email">Email</label>
      //       </div>
      //       <div className="col-75">
      //         <input id="email" type="text" name="email" defaultValue={currUser[0].email} required/>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <div className="col-25">
      //         <label htmlFor="city">City</label>
      //       </div>
      //       <div className="col-75">
      //         <input id="city" type="text" name="city" defaultValue={currUser[0].city} required/>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <div className="col-25">
      //         <label htmlFor="state">State</label>
      //       </div>
      //       <div className="col-75">
      //         <input id="state" type="text"  name="state" defaultValue={currUser[0].state} required/>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <div className="col-25">
      //         <label htmlFor="zip">Zipcode</label>
      //       </div>
      //       <div className="col-75">
      //       <input id="zipcode" type="text"  name="zip" defaultValue={currUser[0].zipcode} required/>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <input type="submit"  id="submit" value="Submit Changes"/>
      //     </div>
      //   </form>
      // </div>
    );
  }
};

export default UserSettings;
