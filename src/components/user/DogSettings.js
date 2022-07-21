import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { app, db } from '../../config/fbConfig';
import { getAuth } from 'firebase/auth';
import './Settings.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

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

  console.log('THIS IS MY DOG: ', currDog);

  const handleSubmit = (e) => {
    if (user) {
      let name = document.getElementById('name').value;
      let breed = document.getElementById('breed').value;
      let size = document.getElementById('size').value;
      let bio = document.getElementById('about-me').value;

      async function updateSettings() {
        const currDogDB = doc(db, 'dogs', currDog[0].documentId);
        await updateDoc(currDogDB, {
          name: name,
          breed: breed,
          size: size,
          bio: bio,
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

  if (!dogs[0]) {
    console.log('No Dogs Here!');
  } else {
    return (
      <div className="container" style={{ backgroundColor: '#7ed7f0' }}>
        <Form className="settings" onSubmit={handleSubmit}>
          <h1>Edit Dog Information</h1>
          <br />
          <Form.Group className="mb-3" controlId="formGridName">
            <Form.Label className="label">Name</Form.Label>
            <Form.Control type="text" defaultValue={currDog[0].name} required />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label className="label">Email</Form.Label>
          <Form.Control
            type="email"
            required
          />
        </Form.Group> */}

          <Form.Group as={Col} controlId="formGridBreed">
            <Form.Label className="label">Breed</Form.Label>
            <Form.Control type="text" defaultValue={currDog[0].breed} />
          </Form.Group>

          <Row className="mb-3" align-items-center>
            <Form.Group as={Col} controlId="formGridAge">
              <Form.Label className="label">Age</Form.Label>
              <Form.Control
                type="text"
                defaultValue={currDog[0].age}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridSize">
              <Form.Label className="label">Select Size</Form.Label>

              <Form.Select size="lg" defaultValue="Choose...">
                <Form.Control type="text" defaultValue={currDog[0].size} />

                <option>Choose...</option>
                <option>Toy</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>Giant</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formGridBio">
            <Form.Label className="label">Tell us about your pup</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={currDog[0].bio}
            />
          </Form.Group>

          {/* <Form.Group controlId="formGridPic">
          <Form.Label className="label">Upload pictures</Form.Label>

          <Form.Control
            type="file"
            multiple
            onChange={(event) => setImageUrl(event.target.value)}
          />
        </Form.Group> */}

          <Form.Group controlId="formGridPic">
            <Form.Label className="label">Upload pictures</Form.Label>

            <Form.Control placeholder="Add image URL" type="text" multiple />
          </Form.Group>
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
    );
  }
};

export default DogSettings;
