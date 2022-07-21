import React, { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, inputDogInfo } from '../Auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/fbConfig';
import { useNavigate } from 'react-router-dom';
import './signupDog.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// ------- ADD DOG INFO AFTER REGISTERING --------
function DogRegisterInfoForm() {
  // ----- get current users uid -------------
  const currentUser = auth.currentUser;
  // console.log('THIS IS currentUser', currentUser);
  // console.log('hello user', currentUser);

  //grab current user from db
  const [user, setUser] = useState({});
  // ---- set age to integer??? -----------
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [imageUrl, setImageUrl] = useState([]);
  // const [imageUrl2, setImageUrl2] = useState([]);
  // const [imageUrl3, setImageUrl3] = useState([]);
  const [size, setSize] = useState('');
  const [bio, setBio] = useState('');
  // const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate('/home');

  const addDogDocumentAndInfo = () => {
    const userUID = user.uid;
    const ownerName = user.name;
    inputDogInfo(
      name,
      age,
      breed,
      gender,
      size,
      bio,
      imageUrl,
      // imageUrl2,
      // imageUrl3,
      userUID,
      ownerName
    );
    navigate('/home');
  };

  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = [];
        /// exposing all USERS from db into state; BAD;
        // Better: Set only the user that you wnat.
        querySnapshot.forEach((doc) => {
          if (currentUser.uid === doc.data().uid) {
            setUser({ ...doc.data(), docId: doc.id });
          }
          userData.push(doc.data());
        });
      } catch (err) {
        console.log(err, 'what happened? where is everyone?');
      }
    })();
  }, []);
  // console.log('this is the user: ', user);

  return (
    // -------- JI: -------------

    <div className="dogInfo_container container-fluid">
      <div className="container">
        <h1>Let's Setup Your Dog's Profile</h1>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Dog's Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          placeholder="Age"
        />
        <input
          type="text"
          className="register__textBox"
          value={breed}
          onChange={(event) => setBreed(event.target.value)}
          placeholder="Breed"
        />
        <input
          type="text"
          className="register__textBox"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          placeholder="Gender"
        />
        <input
          type="text"
          className="register__textBox"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          placeholder="Tell us about your dog!"
        />
        <input
          type="text"
          className="register__textBox"
          value={size}
          onChange={(event) => setSize(event.target.value)}
          placeholder="Is your dog small, medium, large?"
        />
        <input
          type="text"
          className="register__textBox"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="Add your dog's picture's imageUrl :)"
        />
        <button className="register__btn" onClick={addDogDocumentAndInfo}>
          Register
        </button>
      </div>
    </div>
  );
}

export default DogRegisterInfoForm;

// <div className="dogInfo_container container-fluid">
/* <Form>
        <h1>Let's Setup Your Dog's Profile</h1>
        <br />
        <Form.Group className="mb-3" controlId="formGridName">
          <Form.Label className="label">Dog's Name</Form.Label>
          <Form.Control
            onChange={(event) => setAge(event.target.value)}
            type="text"
          />
        </Form.Group>
        <Row className="mb-3" align-items-center>
          <Form.Group as={Col} controlId="formGridAge">
            <Form.Label className="label">Dog's Age</Form.Label>
            <Form.Control
              onChange={(event) => setAge(event.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBreed">
            <Form.Label className="label">Enter Breed</Form.Label>
            <Form.Control
              onChange={(event) => setBreed(event.target.value)}
              type="text"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3" align-items-center>
          <Form.Group as={Col} controlId="formGridGender">
            <Form.Label className="label">Enter Gender</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => setGender(event.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSize">
            <Form.Label className="label">Select Size</Form.Label>

            <Form.Select size="lg" defaultValue="Choose...">
              <Form.Control
                type="text"
                onChange={(event) => setSize(event.target.value)}
              />

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
            onChange={(event) => setBio(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGridPic">
          <Form.Label className="label">Upload pictures</Form.Label>

          <Form.Control
            type="file"
            multiple
            onChange={(event) => setImageUrl(event.target.value)}
          />
        </Form.Group>

         <Form.Group controlId="formGridPic">
          <Form.Label className="label">Upload pictures</Form.Label>

          <Form.Control
            placeholder="Add image URL"
            type="text"
            multiple
            onChange={(event) => setImageUrl(event.target.value)}
          />
        </Form.Group>

        <br />
        <Button className="register__btn" onClick={addDogDocumentAndInfo}>
          Register
        </Button>
      </Form>
    </div> */
